import mongoose from "mongoose";
import { Schema } from "mongoose";

const otpSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
        expiresAt: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model("otp", otpSchema);
