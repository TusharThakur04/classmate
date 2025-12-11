import { Request, Response } from "express";
import { FlowReqBody } from "../types/dtos.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createFlow = async (req: Request<{}, {}, FlowReqBody>, res: Response) => {
  const { userId, trigger, action, flowName } = req.body;

  const { availableTriggerId, from } = trigger;

  const flow = await prisma.flow.create({
    data: {
      userId,
      name: flowName,

      trigger: {
        create: {
          metadata: { senderEmail: from },
          availableTrigger: {
            connect: { id: availableTriggerId },
          },
        },
      },

      actions: {
        create: action.map((a, index) => ({
          availableAction: {
            connect: { id: a.availableActionId },
          },
          order: index,
        })),
      },
    },
  });
  console.log("flow created:", req.body);
  res.status(201).json({ message: "Flow created successfully" });
};

export default createFlow;
