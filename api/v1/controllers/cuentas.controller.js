import { crearCuentaService } from "../services/cuentas.services.js";

export const crearCuentaController = async (req, res) => {
    const cuentaData = {
        ...req.body,
        userId: req.user.userId
    };
    const cuenta = await crearCuentaService(cuentaData);

    res.status(200).json({message: 'Cuenta registrada', cuenta})
}