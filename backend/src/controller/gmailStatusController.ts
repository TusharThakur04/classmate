import { Request, Response } from "express";
import prisma from "../lib/PrismaClient.js";

const gmailStatusController = async (req: any, res: Response) => {
  const auth = req.auth();
  const userId = auth.userId;

  console.log("Gmail status check for userId:", userId);

  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  try {
    const gmailAuth = await prisma.gmailAuth.findUnique({
      where: { userId },
    });

    console.log("Gmail auth record:", gmailAuth);

    if (gmailAuth) {
      return res.status(200).json({ connected: true });
    } else {
      return res.status(200).json({ connected: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch Gmail status" });
  }
};

export default gmailStatusController;
