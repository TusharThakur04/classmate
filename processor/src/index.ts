import prisma from "./lib/prisma.js";
import kafka from "./lib/kafka.js";

const producer = kafka.producer();

const startProcessor = async () => {
  while (1) {
    const outbox = await prisma.flowRunOutbox.findMany({
      take: 10,
    });

    if (outbox.length === 0) continue;
    console.log(outbox);

    await producer.connect();
    await producer.send({
      topic: "outbox-flow",
      messages: outbox.map((o) => ({
        key: o.flowRunId,
        value: o.flowRunId,
      })),
    });
    console.log("sent");

    await prisma.flowRunOutbox.deleteMany({
      where: {
        id: {
          in: outbox.map((o) => o.id),
        },
      },
    });

    console.log("deleted the pushed flow from flowRunOutbox");
    await producer.disconnect();
  }
};

startProcessor();
