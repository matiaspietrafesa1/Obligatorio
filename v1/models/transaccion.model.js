import mongoose, { now } from "mongoose";
import {MONEDAS, TIPOS} from "../data/transacciones.data.js";

import Usuario from "./usuario.model.js";
import Cuenta from "./cuenta.model.js";

const { Schema } = mongoose;

const transaccionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Usuario', index: true, required: true },
    cuentaId: { type: Schema.Types.ObjectId, ref: 'Cuenta'},
    tipo: { type: String, enum: TIPOS, required: true },
    fecha: { type: Date, required: true, default: Date.now},
    monto: { type: Number, min: 1, required: true },
    description: { type: String, trim: true, maxlength: 140, default: '' },
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria' },
});

export default mongoose.model("Transaccion", transaccionSchema);