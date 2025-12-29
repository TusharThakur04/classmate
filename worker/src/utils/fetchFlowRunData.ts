import { FlowRunData } from "../dto/FlowData.js";
import prisma from "../lib/PrismaClient.js";

const fetchFlowData = async (flowRunId: string) => {
  const flowRunData = await prisma.flowRun.findUnique({
    where: { id: flowRunId },
    select: {
      id: true,
      metadata: true,
      flow: {
        select: {
          userId: true,
          actions: {
            select: {
              order: true,
              metadata: true,
              availableAction: {
                select: {
                  actionName: true,
                },
              },
            },
            orderBy: { order: "asc" },
          },
          user: {
            select: {
              gmailAuth: {
                select: {
                  accessToken: true,
                  refreshToken: true,
                  expiresAt: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (flowRunData !== null) {
    const gmailAuth = flowRunData.flow.user.gmailAuth;

    if (!gmailAuth) {
      throw new Error("error while obtaining gmailAuth");
    }
    const data: FlowRunData = {
      flowRunId: flowRunData.id,
      metadata: flowRunData.metadata,

      gmailAuth: {
        accessToken: gmailAuth.accessToken,
        refreshToken: gmailAuth.refreshToken,
        expiresAt: gmailAuth.expiresAt,
      },

      actions: flowRunData.flow.actions.map((action) => ({
        type: action.availableAction.actionName,
        config: action?.metadata,
        order: action.order,
      })),
    };

    console.log("flowRunData--", flowRunData);
    return data;
  }
};

export default fetchFlowData;
