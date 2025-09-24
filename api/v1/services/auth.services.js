import Usuario from "../models/usuario.model.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const loginService = async ({ username, password }) => {
    const usuario = await Usuario.findOne({ username });
    if (!usuario || !bcrypt.compareSync(password, usuario.password)) {
        let err = new Error("Credenciales inválidas");
        err.status = 401;
        throw err;
    }

    const token = jwt.sign({ id: usuario.id, username, plan: usuario.plan }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    return token;
}

export const registerService = async ({ username, password, email }) => {
    const usuario = await Usuario.findOne({ $or: [{ username }, { email }] });
    if (usuario) {
        let err = new Error("Usuario ya existe");
        err.status = 409;
        throw err;
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = new Usuario({ username, password: hashPassword, email });
    await nuevoUsuario.save();
    const token = jwt.sign({ id: nuevoUsuario.id, username, plan: nuevoUsuario.plan }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    return token;
}

