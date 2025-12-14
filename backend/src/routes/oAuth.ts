import { Router } from "express";
import oAuth from "../controller/oAuthController.js";
import redirectToGoogle from "../controller/redirectToGoogleController.js";
import gmailStatusController from "../controller/gmailStatusController.js";

const router = Router();

router.get("/gmail", gmailStatusController);
router.get("/google", redirectToGoogle);

router.get("/google/callback", oAuth);

export default router;
