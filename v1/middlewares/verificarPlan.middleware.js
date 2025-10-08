import { cantidadTransaccionesService } from "../services/usuarios.services.js";

export const verificarPlanMiddleware = async (req, res, next) => {
    const plan = req.user.plan;
    if (plan === "plus" && await cantidadTransaccionesService(req.user.userId) >= 10) {
        return res.status(403).json({ error: "Límite de transacciones alcanzado para el plan plus. Actualiza a premium para más transacciones." });
    }
    next();
};
