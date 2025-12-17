import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "flow-outbox",
  brokers: ["localhost:9092"],
});

export default kafka;
