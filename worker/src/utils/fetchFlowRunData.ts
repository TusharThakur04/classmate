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
    const data: FlowRunData = {
      flowRunId: flowRunData.id,
      metadata: flowRunData.metadata,

      gmailAuth: {
        accessToken: flowRunData.flow.user.gmailAuth?.accessToken,
        refreshToken: flowRunData.flow.user.gmailAuth?.refreshToken,
        expiresAt: flowRunData.flow.user.gmailAuth?.expiresAt,
      },

      actions: flowRunData.flow.actions.map((action) => ({
        type: action.availableAction.actionName,
        config: action?.metadata,
        order: action.order,
      })),
    };
    return data;
  }
};

export default fetchFlowData;
