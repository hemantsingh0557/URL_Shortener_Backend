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
        uniqueClicksForOs: { 
            type: Number, 
            default: 0, 
        },
        uniqueUsersForOs: { 
            type: Number, 
            default: 0, 
        },
        deviceType: { 
            type: String, 
            required: true, 
        },
        uniqueClicksForDevice: { 
            type: Number, 
            default: 0, 
        },
        uniqueUsersForDevice: { 
            type: Number, 
            default: 0, 
        },
        ipAddress: { 
            type: String, 
            required: true, 
        },
        geolocation: { 
            type: String, 
        },
    },
    {
        timestamps: true,
    },
);

export const UrlAnalyticsModel = mongoose.model("UrlAnalytics", urlAnalyticsSchema);
