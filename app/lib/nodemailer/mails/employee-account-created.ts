import { PAGES } from "../../../config/const.js";
import type { Transporter } from "../../../interfaces/index.js";

export async function employeeAccountCreated({
    transporter,
    user,
    from,
    to,
}: {
    transporter: Transporter;
    user: {
        email: string;
        username: string;
        password: string;
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
            <h1>Account created</h1>
            <p>Hi ${user.username},</p>
            <p>This email is to inform you that your employee account has been created.</p>
            <p>You can now log in to your account and start using our platform.</p>
            <br />
            <p>Your credentials are:</p>
            <p>Email: ${user.email}</p>
            <p>Password: ${user.password}</p>
            <br />
            <p>Make sure to change your password after logging in.</p>
            <a href="${PAGES.FRONTEND.BASE}${PAGES.FRONTEND.SIGNIN.EMPLOYEE}">
                Sign in
            </a>
            <p>Welcome to our platform!</p>
        </div>
    `;

    await transporter.sendMail({
        from,
        to,
        subject: "Account created",
        html,
    });
}
