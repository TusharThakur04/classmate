import Router from "express";
import createFlow from "../controller/createFlow";
import getFlow from "../controller/getFlow";

const router = Router();

router.get("/:userId", getFlow);
router.post("/", createFlow);

export default router;
