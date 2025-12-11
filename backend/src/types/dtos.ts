export interface FlowReqBody {
  userId: string;
  flowName: string;
  trigger: { availableTriggerId: number; from: string };
  action: {
    availableActionId: number;
    // actionMetadata: { [key: string]: string };
  }[];
}
