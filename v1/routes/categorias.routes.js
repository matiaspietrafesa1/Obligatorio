import express from 'express';
import { obtenerCategoriasController } from '../controllers/categorias.controller.js';

const router = express.Router();

router.get('/', obtenerCategoriasController);

export default router;
