import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "flow-outbox",
  brokers: [`${process.env.KAFKA_URL}`],
});

export default kafka;
