import Transaccion from '../models/transaccion.model.js';


export const crearTransaccionService = async (data) => {
    const nuevaTransaccion = new Transaccion(data);
    
    return await nuevaTransaccion.save();
}