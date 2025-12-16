import prisma from "../lib/PrismaClient.js";

const storeHistoryId = async (userId: string, historyId: string) => {
  await prisma.gmailAuth.updateMany({
    where: { userId },
    data: { historyId },
  });
};

export default storeHistoryId;
