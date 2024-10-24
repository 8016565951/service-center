import mongoose, { Schema } from "mongoose";
import { ROLES } from "../lib/utils/constant.js";
import type { IUser } from "../interface/index.js";

// Define the user schema
const userSchema = new Schema<IUser>(
    {
        fullName: {
            type: String,
            required: true,
        },
        ImageUrl: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        dob: {
            type: Date,
        },
        address: {
            street: {
                type: String,
            },
            city: {
                type: String,
            },
            state: {
                type: String,
            },
            zipCode: {
                type: String,
            },
            country: {
                type: String,
            },
        },
        role: {
            type: String,
            enum: Object.values(ROLES),
            default: ROLES.USER,
        },
        booking: {
            type: Schema.Types.ObjectId,
            ref: "booking",
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
        versionKey: false, // Disable the versionKey (__v) field
    }
);

// Create and export the User model
const User = mongoose.model<IUser>("User", userSchema);
export default User;
