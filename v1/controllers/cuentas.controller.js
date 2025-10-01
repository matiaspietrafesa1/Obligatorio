import {
    crearCuentaService,
    obtenerCuentaService,
    totalIngresosCuentaService,
    totalEgresosCuentaService
} from "../services/cuentas.services.js";

export const crearCuentaController = async (req, res) => {
    const cuentaData = {
        ...req.body,
        userId: req.user.userId
    };
    const cuenta = await crearCuentaService(cuentaData);

    res.status(200).json({ message: 'Cuenta registrada', cuenta })
}

export const obtenerCuentaController = async (req, res) => {
    const cuentaData = {
        ...req.params,
        userId: req.user.userId
    };
    const cuenta = await obtenerCuentaService(cuentaData);

    res.status(200).json({ message: 'Cuenta encontrada', cuenta })
};

export const totalIngresosCuentaController = async (req, res) => {
    const cuentaData = {
        ...req.params,
        userId: req.user.userId
    };
    const totalIngresos = await totalIngresosCuentaService(cuentaData);
    res.status(200).json({ message: 'Total ingresos de la cuenta', totalIngresos });
}

export const totalEgresosCuentaController = async (req, res) => {
    const cuentaData = {
        ...req.params,
        userId: req.user.userId
    };
    const totalEgresos = await totalEgresosCuentaService(cuentaData);
    res.status(200).json({ message: 'Total egresos de la cuenta', totalEgresos });
}
