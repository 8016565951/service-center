import booking from "../../model/booking.js";

class BookingRepo {
    createBooking = async (data: any) => {
        return await booking.create(data);
    };

    getBookingById = async (id: string) => {
        return await booking.findById(id);
    };

    updateBooking = async (id: string, data: any) => {
        return await booking.findByIdAndUpdate(id, data, { new: true });
    };

    deleteBooking = async (id: string) => {
        return await booking.findByIdAndDelete(id);
    };

    getBookings = async () => {
        return await booking.find();
    };
}

export default new BookingRepo();
