export interface FlowReqBody {
  userId: string;
  flowName: string;
  availableTriggerId: number;
  action: {
    availableActionId: number;
    // actionMetadata: { [key: string]: string };
  }[];
}
