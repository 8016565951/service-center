import mongoose from "mongoose";
import type { IBooking } from "../interface/index.js";

const bookingSchema = new mongoose.Schema<IBooking>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        serviceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "service",
        },
        date: {
            type: Date,
        },
        time: {
            type: String,
        },
        status: {
            type: String,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model("booking", bookingSchema);
