import Router from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/:userid/:flowid", async (req, res) => {
  const data = req.body;
  const { userid, flowid } = req.params;

  await prisma.$transaction(async (tx) => {
    const flowRun = await tx.flowRun.create({
      data: {
        flowId: flowid,
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
