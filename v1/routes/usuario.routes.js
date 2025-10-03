import express from "express";
import { alternarPlanController } from "../controllers/usuario.controller.js";

const router = express.Router();

router.patch("/alternar-plan", alternarPlanController);

export default router;