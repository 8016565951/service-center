import { Schema } from "mongoose";
import { booking } from "../model/index.js";

interface IBooking {
    userId: Schema.Types.ObjectId;
    serviceId: Schema.Types.ObjectId;
    date: Date;
    time: string;
    status: string;
}

export type { IBooking };
