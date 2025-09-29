import mongoose from "mongoose";
import Cuenta from "../models/cuenta.model.js";
import Usuario from "../models/usuario.model.js";

export const crearCuentaService = async (data) => {
    // deberia venir el id de usuario correcto por el token (import)
    const cuentaNueva = new Cuenta(data);
    const usuario = await Usuario.findById(data.userId);
    usuario.cuentas.push(cuentaNueva._id);
    await usuario.save();

    return await cuentaNueva.save();
};

export const actualizarSaldoService = async (cuentaId, monto, tipo) => {
    const cuenta = await Cuenta.findById(cuentaId);
    let saldoActual = cuenta.saldo;
    
    if (tipo === 'ingreso') saldoActual += monto;
    else saldoActual -= monto;

    cuenta.saldo = saldoActual;

    await cuenta.save();
};


export const obtenerCuentaService = async (data) => {
    const { cuentaId, userId } = data;
    
    const cuenta = await Cuenta.findById(cuentaId).where({userId}).populate('transacciones');

    if (!cuenta) throw new Error('Cuenta no encontrada o no pertenece al usuario');
    return cuenta;
};