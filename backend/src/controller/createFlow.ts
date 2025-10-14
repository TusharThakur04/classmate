import { Request, Response } from "express";
import { FlowReqBody } from "../types/dtos";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createFlow = async (req: Request<{}, {}, FlowReqBody>, res: Response) => {
  const { userId, availableTriggerId, action } = req.body;

  const flow = await prisma.flow.create({
    data: {
      userId,

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
