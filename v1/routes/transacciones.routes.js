import express from "express";
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware.js';
import { crearTransaccionSchema } from "../validators/transacciones.validator.js";
import {
    crearTransaccionController,
    obtenerTransaccionesRecientesController
} from "../controllers/transacciones.controller.js";
import { authenticateMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/crear', authenticateMiddleware, validateBodyMiddleware(crearTransaccionSchema), crearTransaccionController);

router.get('/recientes/:cuentaId', authenticateMiddleware, obtenerTransaccionesRecientesController);

export default router;