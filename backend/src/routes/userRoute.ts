import Router, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/mirrorUser", async (req: Request, res: Response) => {
  try {
    const { id, email, name } = req.body;

    if (!id || !email) {
      return res.status(400).json({ message: "id and email are required" });
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    const newUser = await prisma.user.create({
      data: { id, email, name },
    });

    return res.status(201).json({
      message: "User created",
      user: newUser,
    });
  } catch (err) {
    console.error("Error in /mirrorUser:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default router;
