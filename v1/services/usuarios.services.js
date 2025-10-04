import { crearCuentaService } from "./cuentas.services.js";
import Usuario from "../models/usuario.model.js";
import { PLAN_PLUS, PLAN_PREMIUM } from "../data/usuarios.data.js";

export const crearUsuarioService = async (data) => {
    const usuarioNuevo = new Usuario(data);
    await usuarioNuevo.save();
    crearCuentaService({ moneda: 'UYU', userId: usuarioNuevo._id, nombre: 'Cuenta en Pesos' });
    crearCuentaService({ moneda: 'USD', userId: usuarioNuevo._id, nombre: 'Cuenta en Dólares' });
    return usuarioNuevo;
}

export const alternarPlanService = async (userId) => {
    const usuario = await Usuario.findById(userId);
    if (!usuario) {
        let err = new Error("Usuario no encontrado");
        err.status = 404;
        throw err;
    }

    // Alternar entre plus y premium
    if (usuario.plan === PLAN_PLUS) {
        usuario.plan = PLAN_PREMIUM;
    } else {
        let err = new Error("Ya estás en el plan premium");
        err.status = 400;
        throw err;
    }
    await usuario.save();
    return usuario;
}