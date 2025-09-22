import prisma from "../lib/prisma";
import kafka from "../lib/kafka";

const producer = kafka.producer();

const startProcessor = async () => {
  while (1) {
    const outbox = await prisma.flowRunOutbox.findMany({
      take: 10,
    });

    console.log(outbox);

    await producer.connect();
    await producer.send({
      topic: "outbox-flow",
      messages: outbox.map((obj) => {
        return { value: obj.flowRunId };
      }),
    });

    console.log("sent");
    await producer.disconnect();
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
};

startProcessor();
