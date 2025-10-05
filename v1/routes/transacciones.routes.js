import express from "express";
import { verificarPlanMiddleware } from "../middlewares/verificarPlan.middleware.js";
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware.js';
import {
    crearTransaccionSchema,
    modificarTransaccionSchema,
    filtrarTransaccionesSchema
} from "../validators/transacciones.validator.js";
import {
    crearTransaccionController,
    obtenerTransaccionesRecientesController,
    obtenerTransaccionPorIdController,
    eliminarTransaccionController,
    modificarTransaccionController,
    filtrarTransaccionesController
} from "../controllers/transacciones.controller.js";

const router = express.Router();

router.post('/crear', validateBodyMiddleware(crearTransaccionSchema), verificarPlanMiddleware, crearTransaccionController);

router.get('/recientes/:cuentaId', obtenerTransaccionesRecientesController);

router.get('/obtener/:transaccionId', obtenerTransaccionPorIdController);

router.delete('/eliminar/:transaccionId', eliminarTransaccionController);

router.put('/modificar/:transaccionId', validateBodyMiddleware(modificarTransaccionSchema), modificarTransaccionController);

router.get('/filtrar', validateBodyMiddleware(filtrarTransaccionesSchema), filtrarTransaccionesController);

export default router;