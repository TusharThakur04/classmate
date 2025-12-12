import Router from "express";
import createFlow from "../controller/createFlow.js";
import getFlow from "../controller/getFlow.js";
import deleteFlow from "../controller/deleteFlow.js";

const router = Router();

router.get("/:userId", getFlow);
router.post("/", createFlow);
router.delete("/:flowId", deleteFlow);

export default router;
