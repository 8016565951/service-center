import type { Transporter } from "nodemailer";
import {
    emailVerification,
    emailVerified,
    employeeAccountCreated,
    passwordUpdated,
} from "./mails/index.js";
import { transporter } from "./tranceporter.js";

class Mailer {
    transporter: Transporter;
    from: {
        name: string;
        address: string;
    };

    constructor(transporter: Transporter) {
        this.transporter = transporter;

        this.from = {
            name: "SuRvA",
            address: "YdZj9@example.com",
        };
    }

    sendEmailVerification = async ({
        user,
    }: {
        user: {
            id: string;
            email: string;
            username: string;
        };
    }) => {
        await emailVerification({
            from: this.from,
            to: [
                {
                    name: user.username,
                    address: user.email,
                },
            ],
            transporter: this.transporter,
            user,
        });
    };

    sendEmailVerified = async ({
        user,
    }: {
        user: {
            email: string;
            username: string;
        };
    }) => {
        await emailVerified({
            from: this.from,
            to: [
                {
                    name: user.username,
                    address: user.email,
                },
            ],
            transporter: this.transporter,
        });
    };

    sendEmployeeAccountCreated = async ({
        user,
    }: {
        user: {
            email: string;
            username: string;
            password: string;
        };
    }) => {
        await employeeAccountCreated({
            from: this.from,
            to: [
                {
                    name: user.username,
                    address: user.email,
                },
            ],
            transporter: this.transporter,
            user,
        });
    };

    sendPasswordUpdated = async ({
        user,
    }: {
        user: {
            email: string;
            username: string;
        };
    }) => {
        await passwordUpdated({
            from: this.from,
            to: [
                {
                    name: user.username,
                    address: user.email,
                },
            ],
            transporter: this.transporter,
            user,
        });
    };
}

export const mailer = new Mailer(transporter);
