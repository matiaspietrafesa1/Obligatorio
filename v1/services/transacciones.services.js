import Transaccion from '../models/transaccion.model.js';
import Cuenta from "../models/cuenta.model.js";
import { actualizarSaldoService } from './cuentas.services.js';



export const crearTransaccionService = async (data) => {
    const nuevaTransaccion = new Transaccion(data);
    const cuenta = await Cuenta.findById(data.cuenta);

    cuenta.transacciones.push(nuevaTransaccion._id);
    await cuenta.save();

    await actualizarSaldoService(cuenta._id, data.monto, data.tipo);

    // se esta haciendo un save de cuenta dos veces

    return await nuevaTransaccion.save();
}