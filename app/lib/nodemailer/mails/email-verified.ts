import type { Transporter } from "../../../interfaces/index.js";

export async function emailVerified({
    transporter,
    user,
    from,
    to,
}: {
    transporter: Transporter;
    user: {
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
    const html = `
        <div>
            <h1>Email verified</h1>
            <p>Hi ${user.username},</p>
            <p>Your email address has been verified.</p>
            <p>Thank you for choosing our platform.</p>
        </div>
    `;

    await transporter.sendMail({
        from,
        to,
        subject: "Email verified",
        html,
    });
}
