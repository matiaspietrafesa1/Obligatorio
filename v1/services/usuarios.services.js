import { crearCuentaService } from "./cuentas.services.js";
import Usuario from "../models/usuario.model.js";

export const crearUsuarioService = async (data) => {
    const usuarioNuevo = new Usuario(data);
    await usuarioNuevo.save();
    crearCuentaService({moneda: 'UYU', userId: usuarioNuevo._id, nombre: 'Cuenta en Pesos'});
    crearCuentaService({moneda: 'USD', userId: usuarioNuevo._id, nombre: 'Cuenta en Dólares'});
    return usuarioNuevo;
}