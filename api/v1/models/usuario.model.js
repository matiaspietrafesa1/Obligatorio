import mongoose from "mongoose";
import Cuenta from "./cuenta.model.js";
import Categoria from "./categoria.model.js";

const { Schema } = mongoose;

const usuarioSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true},
    plan: { type: String, enum: ['plus', 'premium'], default: 'plus' },
    cuentas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cuenta"}],
    categorias: [{type: mongoose.Schema.Types.ObjectId, ref: 'Categoria'}]
});

export default mongoose.model("Usuario", usuarioSchema);
