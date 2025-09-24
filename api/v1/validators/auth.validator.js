import Joi from "joi";

export const loginSchema = Joi.object({
    username: Joi.string().min(2).max(50).required().messages({
        "string.min": "El nombre de usuario debe tener al menos {#limit} caracteres",
        "string.max": "El nombre de usuario debe tener como máximo {#limit} caracteres"
    }),
    password: Joi.string().min(6).required()
});

export const registerSchema = Joi.object({
    username: Joi.string().min(2).max(50).required().messages({
        "string.min": "El nombre de usuario debe tener al menos {#limit} caracteres",
        "string.max": "El nombre de usuario debe tener como máximo {#limit} caracteres"
    }),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
});