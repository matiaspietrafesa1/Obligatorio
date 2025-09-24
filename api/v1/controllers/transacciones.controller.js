import { crearTransaccionService } from "../services/transacciones.services.js";

export const crearTransaccionController = async (req, res) => {
    const transaccion = await crearTransaccionService(req.body);

    res.status(200).json({message: 'Transaccion registrada', transaccion})
}