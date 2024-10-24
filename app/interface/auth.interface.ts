interface singUp {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}
interface singIn {
    email: string;
    password: string;
}
interface forgotPassword {
    email: string;
}
interface resetPassword {
    password: string;
    token: string;
}

export type { singUp, singIn, forgotPassword, resetPassword };
