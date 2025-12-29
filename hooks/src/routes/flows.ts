import Router from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();

router.post("/:userId/:flowId", async (req, res) => {
  const prisma = new PrismaClient();

  const data = req.body;
  const { userId, flowId } = req.params;

  await prisma.$transaction(async (tx) => {
    const flowRun = await tx.flowRun.create({
      data: {
        flowId,
        metadata: data,
      },
    });

    const flowRunOutbox = await tx.flowRunOutbox.create({
      data: {
        flowRunId: flowRun.id,
      },
    });
    return { flowRun, flowRunOutbox };
  });

  res.json({ message: `flow created`, data });
});

export default router;
