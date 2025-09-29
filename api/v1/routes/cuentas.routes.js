import express from "express";
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware.js';
import { crearCuentaSchema } from "../validators/cuentas.validator.js";
import { crearCuentaController } from "../controllers/cuentas.controller.js";
import { authenticateMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/crear', authenticateMiddleware, validateBodyMiddleware(crearCuentaSchema), crearCuentaController);

export default router;