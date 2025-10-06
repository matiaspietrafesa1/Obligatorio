import Joi from "joi";
import { TIPOS, MONEDAS } from "../data/transacciones.data.js";

export const crearTransaccionSchema = Joi.object({
  cuenta: Joi.string().required(),
  tipo: Joi.string().valid(...TIPOS).required(),
  fecha: Joi.date().iso().optional(),
  monto: Joi.number().min(1).required(),
  descripcion: Joi.string().trim().max(140).allow('').optional(),
  categoria: Joi.string().required(),
});

export const modificarTransaccionSchema = Joi.object({
  cuenta: Joi.string().required(),
  tipo: Joi.string().valid(...TIPOS).required(),
  fecha: Joi.date().iso().optional(),
  monto: Joi.number().min(1).required(),
  descripcion: Joi.string().trim().max(140).allow('').optional(),
  categoria: Joi.string().required(),
}).or('cuenta', 'tipo', 'fecha', 'monto', 'descripcion', 'categoria');

// este or significa que al menos uno de los campos debe estar presente

export const filtrarTransaccionesSchema = Joi.object({
  cuentaId: Joi.string().optional(),
  tipo: Joi.string().valid(...TIPOS).optional(),
  categoria: Joi.string().optional(),
  fechaInicio: Joi.date().iso().optional(),
  fechaFin: Joi.date().iso().optional(),
});
