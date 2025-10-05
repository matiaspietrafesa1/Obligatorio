import mongoose from "mongoose";
import Cuenta from "./cuenta.model.js";
import Categoria from "./categoria.model.js";
import { PLANES, PLAN_PLUS } from "../data/usuarios.data.js";

const { Schema } = mongoose;

const usuarioSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true},
    plan: { type: String, enum: PLANES, default: PLAN_PLUS },
    cuentas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cuenta"}],
    categorias: [{type: mongoose.Schema.Types.ObjectId, ref: 'Categoria'}],
    cantidadTransacciones: { type: Number, default: 0 }
});

export default mongoose.model("Usuario", usuarioSchema);
