import express from "express";
import { alternarPlanController } from "../controllers/usuario.controller.js";
import { cargarImagenPerfilController } from "../controllers/usuario.controller.js";
import { obtenerImagenPerfilControlller } from "../controllers/usuario.controller.js";

const router = express.Router();

router.patch("/alternar-plan", alternarPlanController);

router.put('/actualizar-imagen', cargarImagenPerfilController);

router.get('/obtener-imagen', obtenerImagenPerfilControlller);

export default router;