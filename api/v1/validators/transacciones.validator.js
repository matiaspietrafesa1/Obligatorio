import Joi from "joi";
import { TIPOS, MONEDAS } from "../data/transacciones.data.js";

export const crearTransaccionSchema = Joi.object({
  
  tipo: Joi.string().valid(...TIPOS).required(),
  fecha: Joi.date().iso().optional(),
  monto: Joi.number().min(1).required(),
  moneda: Joi.string().valid(...MONEDAS).required(),
  description: Joi.string().trim().max(140).allow('').optional(),
});