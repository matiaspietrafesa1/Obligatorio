import Categoria from '../models/categoria.model.js';
import Usuario from '../models/usuario.model.js';

export const crearCategoriaService = async (data) => {
    const nuevaCategoria = new Categoria(data);
    const usuario = await Usuario.findById(data.userId);
    usuario.categorias.push(nuevaCategoria._id);
    await usuario.save();
    return await nuevaCategoria.save();
};

export const obtenerCategoriasService = async (userId) => {
    const usuario = await Usuario.findById(userId).populate('categorias');

    return usuario.categorias.map(categoria => ({
        id: categoria._id,
        nombre: categoria.nombre
    }));
};
