import { Schema } from "mongoose";
import { ROLES } from "../lib/utils/constant.js";
import { user } from "../model/index.js";
interface IUser {
    _id: string;
    fullName: string;
    email: string;
    ImageUrl: string;
    phone: string;
    dob: Date;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    role: ROLES;
    booking?: Schema.Types.ObjectId;
    password: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type { IUser };
