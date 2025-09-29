import Transaccion from '../models/transaccion.model.js';
import Cuenta from "../models/cuenta.model.js";
import { actualizarSaldoService } from './cuentas.services.js';
import { crearCategoriaService } from './categorias.services.js';
import Categoria from '../models/categoria.model.js';



export const crearTransaccionService = async (data) => {
    let nombreCategoria = data.categoria.toLowerCase().trim();
    let categoria = await Categoria.findOne({nombre: nombreCategoria});
    
    if (!categoria) {
        categoria = await crearCategoriaService({nombre: nombreCategoria, userId: data.userId});
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