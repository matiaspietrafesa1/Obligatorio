import Transaccion from '../models/transaccion.model.js';
import Cuenta from "../models/cuenta.model.js";
import { actualizarSaldoService, obtenerCuentaService } from './cuentas.services.js';
import { crearCategoriaService } from './categorias.services.js';
import Categoria from '../models/categoria.model.js';



export const crearTransaccionService = async (data) => {
    let nombreCategoria = data.categoria.toLowerCase().trim();
    let categoria = await Categoria.findOne({ nombre: nombreCategoria });

    if (!categoria) {
        categoria = await crearCategoriaService({ nombre: nombreCategoria, userId: data.userId });
    }

    data.categoria = categoria._id;

    const nuevaTransaccion = new Transaccion(data);
    const cuenta = await Cuenta.findById(data.cuenta);

    if (cuenta.userId.toString() !== data.userId) {
        throw new Error('La cuenta no pertenece al usuario');
    }
    nuevaTransaccion.cuentaId = cuenta._id;
    cuenta.transacciones.push(nuevaTransaccion._id);
    await cuenta.save();

    await actualizarSaldoService(cuenta._id, data.monto, data.tipo);

    // se esta haciendo un save de cuenta dos veces

    return await nuevaTransaccion.save();
}

export const obtenerTransaccionesRecientesService = async (data) => {
    const { userId, cuentaId } = data;
    const transacciones = await Transaccion.find({ userId, cuentaId }).sort({ fecha: -1 }).limit(5);
    return transacciones;
}

export const obtenerTransaccionPorIdService = async (data) => {
    const { userId, transaccionId } = data;
    const transaccion = await Transaccion.findById(transaccionId).where({userId}).populate('categoria');
    if (!transaccion) {
        let err = new Error("No se encontro la transaccion.");
        err.status = (404);
        throw err;
    }
    return transaccion;
}

export const eliminarTransaccionService = async (data) => {
    const { userId, transaccionId } = data;
    const transaccion = await Transaccion.findOne({ userId, _id: transaccionId });
    if (!transaccion) {
        let err = new Error('Transacción no encontrada');
        err.status = 404;
        throw err;
    }
    const cuenta = await Cuenta.findById(transaccion.cuentaId);
    if (cuenta) {
        cuenta.transacciones = cuenta.transacciones.filter(id => id.toString() !== transaccionId);
        await cuenta.save();
    }
    return Transaccion.deleteOne({ userId, _id: transaccionId });
}

export const modificarTransaccionService = async (data) => {
    const { userId, transaccionId, monto, tipo, categoria, descripcion, fecha, cuentaId } = data;
    
    const transaccion = await Transaccion.findOne({ _id: transaccionId, userId });
    if (!transaccion) {
        let err = new Error('Transacción no encontrada');
        err.status = 404;
        throw err;
    }

    if (categoria) {
        let nombreCategoria = categoria.toLowerCase().trim();
        let categoriaDoc = await Categoria.findOne({ nombre: nombreCategoria });
        if (!categoriaDoc) {
            categoriaDoc = await crearCategoriaService({ nombre: nombreCategoria, userId });
        }
        transaccion.categoria = categoriaDoc._id;
    }

    if (monto !== undefined) transaccion.monto = monto;
    if (tipo) transaccion.tipo = tipo;
    if (descripcion) transaccion.descripcion = descripcion;
    if (fecha) transaccion.fecha = fecha;

    actualizarSaldoService(cuentaId, transaccion.monto, transaccion.tipo);

    await transaccion.save();
    return transaccion;
}