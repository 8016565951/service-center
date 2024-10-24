import Joi from "joi";
import type {
    singUp,
    singIn,
    forgotPassword,
    resetPassword,
} from "../../interface/index.js";

export const singUpSchema = Joi.object<singUp>({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .required()
        .pattern(
            new RegExp(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).*$/
            )
        )
        .messages({
            "string.pattern.base":
                "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
        }),
    consfirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .messages({
            "any.only": "Password and confirm password don't match",
        }),
});

export const singInSchema = Joi.object<singIn>({
    email: Joi.string().email().required(),
    password: Joi.string()
        .required()
        .pattern(
            new RegExp(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).*$/
            )
        )
        .messages({
            "string.pattern.base":
                "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
        }),
});

export const forgotPasswordSchema = Joi.object<forgotPassword>({
    email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object<resetPassword>({
    password: Joi.string()
        .required()
        .pattern(
            new RegExp(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).*$/
            )
        )
        .messages({
            "string.pattern.base":
                "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
        }),
    token: Joi.string().required(),
});
