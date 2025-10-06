import Router, { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/mirrorUser", async (req: Request, res: Response) => {
  const { id, email, name } = req.body;

  const emailExists = await prisma.user.findUnique({
    where: { email: req.body.email },
  });

  if (emailExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const mirrorUser = await prisma.user.create({
    data: {
      id,
      email,
      name,
    },
  });

  res.status(201).json({ message: "User created", mirrorUser });
});

export default router;
