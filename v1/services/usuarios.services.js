import { crearCuentaService } from "./cuentas.services.js";
import Usuario from "../models/usuario.model.js";
import { PLAN_PLUS, PLAN_PREMIUM } from "../data/usuarios.data.js";
import jwt from "jsonwebtoken";

export const crearUsuarioService = async (data) => {
    const usuarioNuevo = new Usuario(data);
    crearCuentaService({ moneda: 'UYU', userId: usuarioNuevo._id, nombre: 'Cuenta en Pesos' });
    crearCuentaService({ moneda: 'USD', userId: usuarioNuevo._id, nombre: 'Cuenta en Dólares' });
    await usuarioNuevo.save();
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

    const token = jwt.sign({ id: usuario.id, username: usuario.username, plan: usuario.plan }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    console.log(token);
    
    return token;
}


export const cantidadTransaccionesService = async (userId) => {
    const usuario = await Usuario.findById(userId);
    if (!usuario) {
        let err = new Error("Usuario no encontrado");
        err.status = 404;
        throw err;
    }
    return usuario.cantidadTransacciones;
};
