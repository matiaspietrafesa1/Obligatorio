import express from "express";
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware.js';
import { crearTransaccionSchema } from "../validators/transacciones.validator.js";
import {
    crearTransaccionController,
    obtenerTransaccionesRecientesController,
    obtenerTransaccionPorIdController,
    eliminarTransaccionController,
    modificarTransaccionController
} from "../controllers/transacciones.controller.js";

const router = express.Router();

router.post('/crear', validateBodyMiddleware(crearTransaccionSchema), crearTransaccionController);

router.get('/recientes/:cuentaId', obtenerTransaccionesRecientesController);

router.get('/obtener/:transaccionId', obtenerTransaccionPorIdController);

router.delete('/eliminar/:transaccionId', eliminarTransaccionController);

router.put('/modificar/:transaccionId', modificarTransaccionController);

export default router;