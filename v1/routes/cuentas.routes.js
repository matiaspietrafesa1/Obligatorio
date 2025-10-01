import express from "express";
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware.js';
import { crearCuentaSchema } from "../validators/cuentas.validator.js";
import {
    crearCuentaController, 
    obtenerCuentaController,
    totalIngresosCuentaController,
    totalEgresosCuentaController
} from "../controllers/cuentas.controller.js";

const router = express.Router();

router.post('/crear', validateBodyMiddleware(crearCuentaSchema), crearCuentaController);
router.get('/:cuentaId', obtenerCuentaController);
router.get('/total-ingresos/:cuentaId', totalIngresosCuentaController);
router.get('/total-egresos/:cuentaId', totalEgresosCuentaController);

export default router;