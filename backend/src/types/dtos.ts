export interface FlowReqBody {
  userId: string;
  availableTriggerId: string;
  action: {
    availableActionId: string;
    actionMetadata: string;
  }[];
}
