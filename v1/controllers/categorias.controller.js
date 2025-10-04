import { obtenerCategoriasService } from "../services/categorias.services.js";

export const obtenerCategoriasController = async (req, res) => {
    const categorias = await obtenerCategoriasService(req.user.userId);
    
    return res.status(200).json(categorias);
};
