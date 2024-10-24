import type { Transporter } from "../../../interfaces/index.js";

export async function passwordUpdated({
    transporter,
    user,
    from,
    to,
}: {
    transporter: Transporter;
    user: {
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
            <h1>Password Updated</h1>
            <p>Hi ${user.username},</p>
            <p>This email is to inform you that your password has been updated.</p>
            <br />
            <p>If you did not make this change, please contact us immediately.</p>
        </div>
    `;

    await transporter.sendMail({
        from,
        to,
        subject: "Password Updated",
        html,
    });
}
