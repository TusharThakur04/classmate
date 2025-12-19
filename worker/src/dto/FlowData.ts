import { FlowRunMetadata } from "../lib/PrismaClient.js";

interface Action {
  type: string;
  config: any;
  order: number;
}

export interface FlowRun {
  flowRunId: string;

  context: FlowRunMetadata;

  gmailAuth: {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: Date;
  };

  actions: Action[];
}

export interface ActionContext {
  flowRunId: string;
  context: FlowRunMetadata;
  gmailAuth: {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: Date;
  };
}

export type ActionHandler = (ctx: ActionContext, config?: any) => Promise<void>;
