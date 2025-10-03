import { alternarPlanService } from "../services/usuarios.services.js";

export const alternarPlanController = async (req, res) => {
  const userId = req.user.userId;
  const resultado = await alternarPlanService(userId);
  res.status(200).json({
    message: 'Plan cambiado exitosamente',
    usuario: resultado.usuario
  });
};
