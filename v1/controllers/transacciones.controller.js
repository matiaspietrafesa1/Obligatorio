import {
    crearTransaccionService,
    obtenerTransaccionesRecientesService,
    obtenerTransaccionPorIdService,
    eliminarTransaccionService,
    modificarTransaccionService,
    filtrarTransaccionesService
} from "../services/transacciones.services.js";

export const crearTransaccionController = async (req, res) => {
    const transaccionData = {
        ...req.body,
        userId: req.user.userId
    };
    const transaccion = await crearTransaccionService(transaccionData);

    res.status(201).json({ message: 'Transaccion registrada', transaccion })
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

    const transaccion = await obtenerTransaccionPorIdService(transaccionData);

    res.status(200).json({ transaccion });
}

export const eliminarTransaccionController = async (req, res) => {
    const transaccionData = {
        transaccionId: req.params.transaccionId,
        userId: req.user.userId
    };

    const transaccion = await eliminarTransaccionService(transaccionData);

    res.status(200).json({ message: "Transacción eliminada", transaccion });
}

export const modificarTransaccionController = async (req, res) => {
    const transaccionData = {
        transaccionId: req.params.transaccionId,
        userId: req.user.userId,
        ...req.body
    };

    const transaccion = await modificarTransaccionService(transaccionData);

    res.status(200).json({ transaccion });
};

export const filtrarTransaccionesController = async (req, res) => {
    const { cuentaId, tipo, categoria, fechaInicio, fechaFin } = req.body || {};
    const userId = req.user.userId;

    const transacciones = await filtrarTransaccionesService(userId, fechaInicio, fechaFin, categoria, tipo, cuentaId);

    res.status(200).json({ transacciones });
};
