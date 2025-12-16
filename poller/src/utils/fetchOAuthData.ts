import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchOAuthlData = async () => {
  const userData = await prisma.trigger.findMany({
    where: {
      availableTriggerId: 1, // trigger id for gmail is 1
    },
    select: {
      flow: {
        select: {
          user: {
            select: {
              gmailAuth: {
                select: {
                  accessToken: true,
                  refreshToken: true,
                  expiresAt: true,
                  historyId: true,
                },
              },
              id: true,
            },
          },
          id: true,
        },
      },
      metadata: true,
    },
  });

  const oAuthData = userData.map((trigger: any) => {
    const from = trigger.metadata.senderEmail;
    const gmailAuth = trigger.flow.user.gmailAuth;
    const userId = trigger.flow.user.id;
    const flowId = trigger.flow.id;
    return {
      userId,
      flowId,
      from,
      accessToken: gmailAuth?.accessToken,
      refreshToken: gmailAuth?.refreshToken,
      expiresAt: gmailAuth?.expiresAt,
      historyId: gmailAuth?.historyId,
    };
  });

  console.log("Polling Data:", oAuthData);

  return oAuthData;
};

export default fetchOAuthlData;
