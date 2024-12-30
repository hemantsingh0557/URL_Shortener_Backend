import mongoose from "mongoose";

const urlAnalyticsSchema = new mongoose.Schema(
    {
        shortUrlId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ShortURL", 
            required: true,
        },
        clickTimestamp: { 
            type: Date, 
            default: Date.now, 
        },
        osName: { 
            type: String, 
            required: true, 
        },
        deviceType: { 
            type: String, 
            required: true, 
        },
        ipAddress: { 
            type: String, 
            required: true, 
        },
        geolocation: { 
            type: Map, 
            of: String, //  Dynamic key-value pairs for geolocation attributes
            default: {} ,
        },
    },
    {
        timestamps: true,
    },
);

export const UrlAnalyticsModel = mongoose.model("UrlAnalytics", urlAnalyticsSchema);
