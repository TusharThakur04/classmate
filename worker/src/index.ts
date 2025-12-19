import { Kafka } from "kafkajs";
import fetchFlowData from "./utils/fetchFlowRunData.js";
import { actionRegistry } from "./utils/actionMaps.js";

const kafka = new Kafka({
  clientId: "flow-outbox",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "worker-1" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "outbox-flow", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const flowRunId = message.value?.toString();

      if (!flowRunId) return;

      console.log("processing flowRun:", flowRunId);

      //fetch data

      const flowRunData = await fetchFlowData(flowRunId);

      if (!flowRunData) {
        throw new Error("FlowRun data not found");
      }

      const actions = flowRunData.actions;
      const actionContext = {
        flowRunId: flowRunData.flowRunId,
        context: flowRunData.context,
        gmailAuth: flowRunData.gmailAuth,
      };

      //selecting the appropriate action to be performed

      for (const action of actions) {
        const handler = actionRegistry[action.type];
        if (!handler) throw new Error("Unknown action");

        await handler(actionContext);
      }

      await new Promise((resolve) => setTimeout(resolve, 5000));

      await consumer.commitOffsets([
        { topic, partition, offset: (Number(message.offset) + 1).toString() },
      ]);
    },
  });
};

run();
