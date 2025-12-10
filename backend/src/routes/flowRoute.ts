import Router from "express";
import createFlow from "../controller/createFlow.js";
import getFlow from "../controller/getFlow.js";

const router = Router();

router.get("/:userId", getFlow);
router.post("/", createFlow);

export default router;
