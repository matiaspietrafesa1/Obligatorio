import mongoose from "mongoose";
import Transaccion from "./transaccion.model.js";
import Usuario from "./usuario.model.js";

import { MONEDAS } from "../data/transacciones.data.js";

const { Schema } = mongoose;

const cuentaSchema = new Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "Usuario"},
    moneda: { type: String, enum: MONEDAS, required: true },
    transacciones: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaccion"}],
    saldo: { type: Number, default: 0},
    nombre: { type: String, required: true },
});

export default mongoose.model("Cuenta", cuentaSchema);
