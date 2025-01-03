
import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        shortUrl: {
            type: String, 
            default: "", 
            require : true ,
        },
        longUrl: {
            type: String, 
            default: "", 
            require : true ,
        },
        customAlias: {
            type: String, 
            default: "", 
        },
        topic: {
            type: String, 
            default: "", 
        },
        totalClicks : {
            type : Number ,
            default : 0 ,
        } ,
    },
    {
        timestamps: true,
    },
);

export const ShortURLModel = mongoose.model("shortUrl", shortUrlSchema);


