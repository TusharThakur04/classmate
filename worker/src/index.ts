import { Kafka } from "kafkajs";

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
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      });

      await new Promise((resolve) => setTimeout(resolve, 5000));

      await consumer.commitOffsets([
        { topic, partition, offset: (Number(message.offset) + 1).toString() },
      ]);
    },
  });
};

run();
