// auth controller with verification mail

import type { Request, Response } from "express";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { singUpSchema } from "../../lib/validation/auth.js";
import User from "../../model/user.js";
import { CResponce, handleError } from "../../lib/utils/handle.error.js";
import { mailer } from "../../lib/nodemailer/sendmail.mailer.js";
import userRepo from "../../repositories/api/user.repo.js";
import { hashPassword } from "../../lib/bcrypt/hashpassword.js";
import { AppError } from "../../lib/helpers/error.js";

class AuthController {
    signUp = async (req: Request, res: Response) => {
        try {
            const { error, value } = singUpSchema.validate(req.body);
            if (error) throw error;

            const existingUser = await userRepo.getByEmail(value.email);
            if (existingUser)
                console.log("User with this email already exists");

            const hashedPassword = await hashPassword(value.password);

            const user = await userRepo.CreateUser({
                ...value,
                password: hashedPassword,
                avatarUrl: req,
            });

            const token = jwt.sign(
                {
                    id: user.id,
                },
                process.env.USER_TOKEN_SECRET as string,
                { expiresIn: "1h" }
            );

            res.cookie("admintoken", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });

            await mailer.sendEmailVerification({
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.fullName,
                },
            });

            return res.status(200).json({
                success: true,
                message: "User created successfully",
                data: user,
            });
        } catch (err) {
            return handleError(err, res);
        }
    };

    SignIn = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "User not found",
                });
            }

            const isMatch = await user.$isValid(password);
            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    message: "Incorrect password",
                });
            }

            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET as string,
                {
                    expiresIn: "1d",
                }
            );

            return res.status(200).json({
                success: true,
                message: "User logged in successfully",
                data: user,
                token,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };
}

export default new AuthController();
