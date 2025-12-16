import prisma from "../lib/PrismaClient.js";

const updateHistoryId = async (historyId: string, accessToken: string) => {
  console.log("updating historyId");
  try {
    await prisma.gmailAuth.updateMany({
      where: {
        accessToken,
      },
      data: {
        historyId,
      },
    });
  } catch (error) {
    console.error("Error updating historyId in database:", error);
  }
};

export default updateHistoryId;
