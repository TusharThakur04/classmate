import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const deleteFlow = async (req: Request, res: Response) => {
  const flowId = req.params.flowId;

  const flow = await prisma.flow.delete({
    where: {
      id: flowId,
    },
  });

  console.log("flow deleted:", flowId);
  res.status(200).json({ message: "Flow deleted successfully" });
};

export default deleteFlow;
