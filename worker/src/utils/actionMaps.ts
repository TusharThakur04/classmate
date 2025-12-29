import { ActionHandler } from "../dto/FlowData.js";
import SaveToDrive from "../actions/saveTodrive.js";
import SetReminder from "../actions/setReminder.js";

export const actionRegistry: Record<string, ActionHandler> = {
  setReminder: SetReminder,
  saveToDrive: SaveToDrive,
};
