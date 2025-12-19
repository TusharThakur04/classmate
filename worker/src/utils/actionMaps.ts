import { ActionHandler } from "../dto/FlowData.js";
import SaveToDrive from "./saveTodrive.js";
import SetReminder from "./setReminder.js";

export const actionRegistry: Record<string, ActionHandler> = {
  setReminder: SetReminder,
  saveToDrive: SaveToDrive,
};
