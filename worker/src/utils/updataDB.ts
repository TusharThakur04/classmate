import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateAccessToken = async (refreshToken: any, newTokens: any) => {
  try {
    await prisma.gmailAuth.updateMany({
      where: { refreshToken },
      data: {
        accessToken: newTokens.accessToken,
        expiresAt: newTokens.expiresAt,
      },
    });
  } catch (error) {
    console.error("Error updating tokens in database:", error);
  }
};

export default updateAccessToken;
