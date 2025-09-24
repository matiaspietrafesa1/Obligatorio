import express from 'express';
import authRoutes from './routes/auth.routes.js';
import {authenticateMiddleware} from './middlewares/auth.middleware.js';


const router = express.Router();

router.get("/", (req, res) => {
    res.json({message: "en raiz"})
});

router.use("/auth", authRoutes);

router.use(authenticateMiddleware);


export default router;