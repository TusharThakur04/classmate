import { FlowRunMetadata } from "../lib/PrismaClient.js";

interface Action {
  type: string;
  config: any;
  order: number;
}

export interface FlowRunData {
  flowRunId: string;

  metadata: FlowRunMetadata;

  gmailAuth: {
    accessToken: string;
    refreshToken: string;
    expiresAt: Date;
  };

  actions: Action[];
}

export interface ActionContext {
  flowRunId: string;
  metadata: FlowRunMetadata;
  gmailAuth: {
    accessToken: string;
    refreshToken: string;
    expiresAt: Date;
  };
}

export type ActionHandler = (ctx: ActionContext, config?: any) => Promise<void>;
