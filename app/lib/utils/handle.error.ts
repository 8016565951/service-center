import Joi from "joi";
import logger from "../helpers/logger.js";
import type { Response } from "express";
const statusSchema = Joi.object({
    code: Joi.number().required(),
    message: Joi.string().required(),
}).required();

class AppError extends Error {
    status: { code: number; message: string };

    /**
     * @param {string} message
     * @param {object} status
     */
    constructor(message: string, status: { code: number; message: string }) {
        super(message);
        const { error, value } = statusSchema.validate(status);

        if (error) {
            throw new Error(`Invalid status: ${error.message}`);
        }

        this.status = value;
    }
}

class ValidationError extends Error {
    details: { message: string }[];
    constructor(details: { message: string }[]) {
        super("Validation Error");
        this.details = details;
    }
}

class MulterError extends Error {}
class MongooseError extends Error {}

// JWT Errors
const jwt = {
    NotBeforeError: class extends Error {},
    TokenExpiredError: class extends Error {},
    JsonWebTokenError: class extends Error {},
};

/**
 * @param {any} err
 */
export function sanitizeError(err: unknown): string {
    if (err instanceof AppError) return err.message;
    else if (err instanceof ValidationError) {
        return err.details.map((e) => e.message).join(", ");
    } else if (err instanceof MulterError) return err.message;
    else if (err instanceof MongooseError) return err.message;
    else if (err instanceof jwt.NotBeforeError)
        return err.message + ", the token is not yet valid";
    else if (err instanceof jwt.TokenExpiredError)
        return err.message + ", the token has expired";
    else if (err instanceof jwt.JsonWebTokenError)
        return err.message + ", the token is invalid";
    else if (err instanceof Error) return err.message;
    else return "Unknown error";
}

/**
 * @param {unknown} err
 * @param {import("express").Response} res
 */

export function handleError(err: unknown, res: Response) {
    logger.error(err);

    if (err instanceof AppError) {
        CResponce({
            res,
            message: err.message,
            status: err.status.code,
            data: {},
            longMessage: sanitizeError(err),
        });
    } else if (err instanceof ValidationError) {
        CResponce({
            res,
            message: "Bad Request",
            status: 400,
            data: {},
            longMessage: sanitizeError(err),
        });
    } else if (err instanceof MulterError) {
        CResponce({
            res,
            message: "Bad Request",
            status: 400,
            data: {},
            longMessage: err.message,
        });
    } else if (err instanceof MongooseError) {
        CResponce({
            res,
            message: "Bad Request",
            status: 400,
            data: {},
            longMessage: err.message,
        });
    } else if (err instanceof jwt.NotBeforeError) {
        CResponce({
            res,
            message: "Unauthorized",
            status: 401,
            data: {},
            longMessage: err.message,
        });
    } else if (err instanceof jwt.TokenExpiredError) {
        CResponce({
            res,
            message: "Unauthorized",
            status: 401,
            data: {},
            longMessage: err.message,
        });
    } else if (err instanceof jwt.JsonWebTokenError) {
        CResponce({
            res,
            message: "Unauthorized",
            status: 401,
            data: {},
            longMessage: err.message,
        });
    } else {
        CResponce({
            res,
            message: "Internal Server Error",
            status: 500,
            data: {},
            longMessage: sanitizeError(err),
        });
    }
}
/**
 * @param {object} options
 * @param {import("express").Response} options.res
 * @param {string} options.message
 * @param {any} [options.data]
 * @param {string || any} [options.longMessage]
 * @param {any} options.status
 */
export function CResponce({
    res,
    message = "",
    data = {},
    longMessage = "",
    status = {} as any,
}: {
    res: Response;
    message: string;
    data: any;
    longMessage: string;
    status: any;
}) {
    let code = 200;
    let statuscode = false;

    switch (message) {
        case "Success":
            code = 200;
            statuscode = true;
            break;
        case "Created":
            code = 201;
            statuscode = true;
            break;
        case "Bad Request":
            code = 400;
            break;
        case "Unauthorized":
            code = 401;
            break;
        case "Forbidden":
            code = 403;
            break;
        case "Not Found":
            code = 404;
            break;
        case "Conflict":
            code = 409;
            break;
        case "Internal Server Error":
            code = 500;
            break;
        default:
            code = 200;
            break;
    }

    return res.status(code).json({
        status,
        message,
        data,
        longMessage: longMessage || message,
    });
}
