export const ROLES = {
    USER: "user",
    ADMIN: "admin",
    MOD: "moderator",
    EMPLOYEE: "employee",
};

export const PAGES = {
    FRONTEND: {
        BASE: process.env.FRONTEND_URL,
        SIGNUP: "/auth/signup",
        SIGNIN: {
            GENERAL: "/auth/signin",
            EMPLOYEE: "/auth/signin?type=employee",
            ADMIN: "/auth/signin?type=admin",
        },
        VERIFY_EMAIL: "/auth/verify-email",
    },
    API: {
        SIGNIN: {
            GENERAL: "/api/auth/signin",
            EMPLOYEE: "/api/auth/signin?type=employee",
            ADMIN: "/api/auth/signin?type=admin",
        },
        SIGNUP: "/api/auth/signup",
        SIGNOUT: {
            GENERAL: "/api/auth/signout",
            EMPLOYEE: "/api/auth/signout?type=employee",
            ADMIN: "/api/auth/signout?type=admin",
        },
        VERIFY_EMAIL: "/api/auth/verify-email",
    },
};
export type ROLES = (typeof ROLES)[keyof typeof ROLES];
