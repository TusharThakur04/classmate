import { Request, Response } from "express";
import { FlowReqBody } from "../types/dtos.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createFlow = async (req: Request<{}, {}, FlowReqBody>, res: Response) => {
  const { userId, trigger, action, flowName } = req.body;

  const { availableTriggerId } = trigger;

  const flow = await prisma.flow.create({
    data: {
      userId,
      name: flowName,

      trigger: {
        create: {
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
  console.log("flow created:", flow);
  res.status(201).json({ message: "Flow created successfully" });
};

export default createFlow;
