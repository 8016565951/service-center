import { Router } from "express";

import authRoutes from "./auth.routes.js";
import bookingRoutes from "./booking.routes.js";

const apiRoutes = Router();

apiRoutes.use("/auth", authRoutes);
apiRoutes.use("/booking", bookingRoutes);

export { apiRoutes };
