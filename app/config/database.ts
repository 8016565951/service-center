import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { START, PROTOCOL, HOST, END_POINT } = process.env;

const db = async () => {
    try {
        const connectionString = `${START}${PROTOCOL}${HOST}${END_POINT}`;
        await mongoose.connect(connectionString, {});
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
};

export default db;
