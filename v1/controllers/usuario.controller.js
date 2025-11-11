import { alternarPlanService, cargarImagenPerfilService, obtenerImagenPerfilService } from "../services/usuarios.services.js";

export const alternarPlanController = async (req, res) => {
  const userId = req.user.userId;
  const resultado = await alternarPlanService(userId);
  res.status(200).json({
    message: 'Plan cambiado exitosamente',
    token: resultado
  });
};

export const cargarImagenPerfilController = async (req, res) => {
    const userId = req.user.userId;
    const imagenUrl = req.body.url;
    const resultado = await cargarImagenPerfilService(userId, imagenUrl);
    res.status(200).json({
        message: 'Imagen de perfil cargada exitosamente',
    });
}

export const obtenerImagenPerfilControlller = async (req, res) => {
    const userId = req.user.userId;
    const imagen = await obtenerImagenPerfilService(userId);
    res.status(200).json({
        imagenPerfil: imagen
    });
}