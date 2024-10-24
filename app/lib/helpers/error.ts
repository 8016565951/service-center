import logger from "./logger.js";
import Joi from "joi";

const statusSchema = Joi.object({
    code: Joi.number().required(),
    message: Joi.string().required(),
}).required();

export class AppError extends Error {
    status: Response;

    /**
     * @param {string} message
     * @param {object} status
     */
    constructor(message: string, status: object) {
        super(message);
        const { error, value } = statusSchema.validate(status);

        if (error) {
            throw new Error(`Invalid status: ${error.message}`);
        }

        this.status = value;
    }
}

export function initiateErrorHandler() {
    logger.info("Error Handler initiated");

    process.on("uncaughtException", (err) =>
        logger.error(`Uncaught Exception : ${err}`)
    );
    process.on("uncaughtExceptionMonitor", (err) =>
        logger.error(`Uncaught Exception (Monitor) : ${err}`)
    );
    process.on("unhandledRejection", (reason) =>
        logger.error(`Unhandled Rejection/Catch : ${reason}`)
    );
}
