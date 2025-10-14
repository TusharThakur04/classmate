import Router from "express";
import createFlow from "../controller/createFlow";

const router = Router();

router.post("/", createFlow);

export default router;
