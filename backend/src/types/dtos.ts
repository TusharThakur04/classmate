export interface FlowReqBody {
  userId: string;
  availableTriggerId: number;
  action: {
    availableActionId: number;
    // actionMetadata: { [key: string]: string };
  }[];
}
