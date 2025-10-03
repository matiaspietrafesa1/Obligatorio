import { crearTransaccionService, 
    obtenerTransaccionesRecientesService,
    obtenerTransaccionPorIdService    
} from "../services/transacciones.services.js";

export const crearTransaccionController = async (req, res) => {
    const transaccionData = {
        ...req.body,
        userId: req.user.userId
    };
    const transaccion = await crearTransaccionService(transaccionData);

    res.status(200).json({message: 'Transaccion registrada', transaccion})
}

export const obtenerTransaccionesRecientesController = async (req, res) => {
    const { cuentaId } = req.params;
    const userId = req.user.userId;
    const transacciones = await obtenerTransaccionesRecientesService({ userId, cuentaId });
    res.status(200).json({ transacciones });
}

export const obtenerTransaccionPorIdController = async (req, res) => {
    const transaccionData = {
        transaccionId: req.params.transaccionId,
        userId: req.user.userId
    };

    console.log(transaccionData);
    

    const transaccion = await obtenerTransaccionPorIdService(transaccionData);

    res.status(200).json({ transaccion });
}