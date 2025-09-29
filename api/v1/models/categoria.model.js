import mongoose from "mongoose";

const { Schema } = mongoose;

const categoriaSchema = Schema({
    nombre: { type: String, required: true, unique: true}
});

export default mongoose.model("Categoria", categoriaSchema);