import Joi from "joi";
import { MONEDAS } from "../data/transacciones.data.js";

export const crearCuentaSchema = Joi.object({
    moneda: Joi.string().valid(...MONEDAS).required(),
    nombre: Joi.string().min(2).max(50).required(),
});