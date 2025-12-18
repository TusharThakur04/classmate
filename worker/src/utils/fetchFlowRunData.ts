import FlowRunMetadata from "../dto/FlowData.js";
import FlowRunData from "../dto/FlowData.js";
import prisma from "../lib/PrismaClient.js";

const fetchFlowData = async (flowRunId: string) => {
  const flowRun = await prisma.flowRun.findUnique({
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

  if (flowRun !== null) {
    const data = {
      flowRunId: flowRun.id,
      mailIds: (flowRun.metadata as FlowRunMetadata).mailIds,

      gmailAuth: {
        accessToken: flowRun.flow.user.gmailAuth?.accessToken,
        refreshToken: flowRun.flow.user.gmailAuth?.refreshToken,
        expiresAt: flowRun.flow.user.gmailAuth?.expiresAt,
      },

      actions: flowRun.flow.actions.map((action: any) => ({
        type: action.availableAction.actionName,
        metadata: action.metadata,
        order: action.order,
      })),
    };
    return data;
  }
};

export default fetchFlowData;
