import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import db from "./app/config/database.js";
import { apiRoutes } from "./app/routes/api/index.js";
import type { Logger } from "nodemailer/lib/shared/index.js";
dotenv.config();

const app = express();

db();

app.use(cookieParser());

// Use morgan to log requests
app.use(morgan("dev"));

// // Log incoming request body for debugging
// app.use((req, res, next) => {
//     console.log("Incoming Request Body:", req.body);
//     next();
// });

// Use express built-in middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(express.static("uploads"));

// Routes
app.use("/api", apiRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
