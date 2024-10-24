import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

// Middleware to check for user token
const UserToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.usertoken;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }

    jwt.verify(
        token,
        process.env.USER_TOKEN_SECRET as string,
        (err: unknown, decoded: any) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized",
                });
            }

            req.user = decoded; // Assuming `req.user` is used to store the user info
            next();
        }
    );
};

// Middleware to check for admin token
const adminToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.admintoken;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }

    jwt.verify(
        token,
        process.env.ADMIN_TOKEN_SECRET as string,
        (err: unknown, decoded: any) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized",
                });
            }

            req.user = decoded; // Assuming `req.user` is used to store the user info
            next();
        }
    );
};

// Middleware to verify email token
export async function isTokenValid(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const token = req.query.token as string;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token is required",
            });
        }

        const emailVerified = jwt.verify(
            token,
            process.env.EMAIL_SECRET_KEY as string
        );

        req.user = {
            id: (emailVerified as any).id,
        };
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }
}

export { UserToken, adminToken };
