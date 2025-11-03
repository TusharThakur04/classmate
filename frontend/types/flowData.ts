export interface FlowData {
  id: string;
  name: string;
  userId: string;
  trigger: { availableTrigger: { triggerName: string } };
  actions: { availableAction: { actionName: string }; order: Number }[];
}
