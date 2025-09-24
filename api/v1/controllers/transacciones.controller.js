import { crearTransaccionService } from "../services/transacciones.services.js";

export const crearTransaccionController = async (req, res) => {
    const transaccionData = {
        ...req.body,
        userId: req.user.userId
    };
    const transaccion = await crearTransaccionService(transaccionData);

    res.status(200).json({message: 'Transaccion registrada', transaccion})
}