import jwt from "jsonwebtoken";
import type { Transporter } from "nodemailer";
import { PAGES } from "../../utils/constant.js";
export async function emailVerification({
    transporter,
    user,
    from,
    to,
}: {
    transporter: Transporter;
    user: {
        id: string;
        email: string;
        username: string;
    };
    from: {
        name: string;
        address: string;
    };
    to: {
        name: string;
        address: string;
    }[];
}) {
    const token = jwt.verify(process.env.EMAIL_SECRET as string, "15m");

    const html = `
        <div>
            <h1>Verify your email</h1>
            <p>Hi ${user.username},</p>
            <p>Click the link below to verify your email address.</p>
            <a href="${PAGES.FRONTEND.BASE}${PAGES.FRONTEND.VERIFY_EMAIL}?token=${token}">Verify email</a>
            <p>This link will expire in 15 minutes.</p>
        </div>
    `;

    await transporter.sendMail({
        from,
        to,
        subject: "Verify your email",
        html,
    });
}

export async function emailVerified({
    transporter,
    from,
    to,
}: {
    transporter: Transporter;
    from: {
        name: string;
        address: string;
    };
    to: {
        name: string;
        address: string;
    }[];
}) {
    const html = `
        <div>
            <h1>Email verified</h1>
            <p>Hi,</p>
            <p>Your email has been verified.</p>
        </div>
    `;

    await transporter.sendMail({
        from,
        to,
        subject: "Email verified",
        html,
    });
}
