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
