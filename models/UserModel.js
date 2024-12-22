
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        googleId: {
            type: String,
            required: true, 
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true, 
            unique: true,
        },
        profilePic: {
            type: String, 
            default: "", 
        },
    },
    {
        timestamps: true,
    },
);

export const UserModel = mongoose.model("User", userSchema);


