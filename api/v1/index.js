import express from 'express';
import authRoutes from './routes/auth.routes.js';
import {authenticateMiddleware} from './middlewares/auth.middleware.js';
import transaccionesRoutes from './routes/transacciones.routes.js';
import cuentasRoutes from "./routes/cuentas.routes.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({message: "en raiz"})
});

router.use("/auth", authRoutes);

router.use(authenticateMiddleware);

router.use("/cuenta", cuentasRoutes);

router.use("/transaccion", transaccionesRoutes);

export default router;