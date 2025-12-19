import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type FlowRunMetadata = Prisma.JsonValue;

export default prisma;
