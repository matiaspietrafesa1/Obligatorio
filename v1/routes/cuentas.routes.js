import express from "express";
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware.js';
import { crearCuentaSchema } from "../validators/cuentas.validator.js";
import { crearCuentaController, obtenerCuentaController } from "../controllers/cuentas.controller.js";

const router = express.Router();

router.post('/crear', validateBodyMiddleware(crearCuentaSchema), crearCuentaController);
router.get('/:cuentaId', obtenerCuentaController);

export default router;