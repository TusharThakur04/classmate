import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getFlow = async (req: Request<{ userId: string }>, res: Response) => {
  const userId = req.params.userId;
  console.log(userId);

  const flowData = await prisma.flow.findMany({
    where: { userId },
    include: {
      trigger: {
        select: {
          availableTrigger: {
            select: { triggerName: true },
          },
        },
      },
      actions: {
        select: {
          availableAction: {
            select: { actionName: true },
          },
        },
      },
      flowRun: true,
    },
  });

  console.dir(flowData, { depth: null });

  res.status(200).json({ flowData });
};

export default getFlow;
