import mongoose from "mongoose";
const { Schema } = mongoose;

const usuarioSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    plan: { type: String, enum: ['plus', 'premium'], default: 'plus' }
});

export default mongoose.model("Usuario", usuarioSchema);
