import { Router } from "express";

const bookingRoutes = Router();
import bookingController from "../../controller/api/booking.controller.js";

bookingRoutes.post("/booking", bookingController.createBooking);

bookingRoutes.get("/booking/:id", bookingController.getBookingById);

bookingRoutes.put("/booking/:id", bookingController.updateBooking);

bookingRoutes.delete("/booking/:id", bookingController.deleteBooking);

bookingRoutes.get("/booking", bookingController.getBookings);
export default bookingRoutes;
