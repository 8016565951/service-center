import { Router } from "express";

import authcontroller from "../../controller/api/authcontroller.js";

const authRoutes = Router();

authRoutes.post("/login", authcontroller.SignIn);
authRoutes.post("/signup", authcontroller.signUp);

export default authRoutes;
