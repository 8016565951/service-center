import bookingRepo from "../../repositories/api/booking.repo.js";

class BookingController {
    createBooking = async (req: any, res: any) => {
        try {
            const data = req.body;
            const booking = await bookingRepo.createBooking(data);
            res.status(201).json({
                success: true,
                message: "Booking created successfully",
                data: booking,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };

    getBookingById = async (req: any, res: any) => {
        try {
            const id = req.params.id;
            const booking = await bookingRepo.getBookingById(id);
            res.status(200).json({
                success: true,
                message: "Booking retrieved successfully",
                data: booking,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };

    updateBooking = async (req: any, res: any) => {
        try {
            const id = req.params.id;
            const data = req.body;
            const booking = await bookingRepo.updateBooking(id, data);
            res.status(200).json({
                success: true,
                message: "Booking updated successfully",
                data: booking,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };

    deleteBooking = async (req: any, res: any) => {
        try {
            const id = req.params.id;
            const booking = await bookingRepo.deleteBooking(id);
            res.status(200).json({
                success: true,
                message: "Booking deleted successfully",
                data: booking,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };

    getBookings = async (req: any, res: any) => {
        try {
            const bookings = await bookingRepo.getBookings();
            res.status(200).json({
                success: true,
                message: "Bookings retrieved successfully",
                data: bookings,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };
}

export default new BookingController();
