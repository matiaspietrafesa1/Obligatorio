import Joi from "joi";
import { MONEDAS } from "../data/transacciones.data.js";

export const crearCuentaSchema = Joi.object({
    moneda: Joi.string().valid(...MONEDAS).required(),
});