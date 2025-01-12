import { shortUrlServices, urlAnalyticsServices } from "../services/index.js";
import { CONSTANTS } from "../utils/constants.js";
import { MESSAGES } from "../utils/messages.js";
import { createErrorResponse, createSuccessResponse } from "../utils/responseHelper.js";


export const urlAnalyticsController = {} ;

urlAnalyticsController.getShortUrlAnalytics = async(payload) => {
    const { alias } = payload;
    const urlFromDb = await shortUrlServices.findOne({ shortUrl: alias });
    if (!urlFromDb) {
        return createErrorResponse(MESSAGES.SHORT_URL_NOT_FOUND, CONSTANTS.ERROR_TYPES.DATA_NOT_FOUND);
    }
    const analytics = await urlAnalyticsServices.aggregate([
        { $match: { shortUrlId: urlFromDb._id } },
        {
            $facet: {
                uniqueUsers: [
                    {
                        $group: {
                            _id: "$ipAddress",
                        },
                    },
                    { $count: "uniqueUserCount" },
                ],
                clicksByDate: [
                    {
                        $match: {
                            clickTimestamp: {
                                $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
                            },
                        },
                    },
                    {
                        $group: {
                            _id: {
                                $dateToString: {
                                    format: "%Y-%m-%d",
                                    date: "$clickTimestamp",
                                },
                            },
                            clickCount: { $sum: 1 },
                        },
                    },
                    { $sort: { _id: 1 } },
                ],
                osType: [
                    {
                        $group: {
                            _id: "$osName",
                            uniqueClicks: { $sum: 1 },
                            uniqueUsers: { $addToSet: "$ipAddress" },
                        },
                    },
                    {
                        $project: {
                            _id : 0 ,
                            osName: "$_id",
                            uniqueClicks: 1,
                            uniqueUsers: { $size: "$uniqueUsers" },
                        },
                    },
                ],
                deviceType: [
                    {
                        $group: {
                            _id: "$deviceType",
                            uniqueClicks: { $sum: 1 },
                            uniqueUsers: { $addToSet: "$ipAddress" },
                        },
                    },
                    {
                        $project: {
                            _id : 0 ,
                            deviceName: "$_id",
                            uniqueClicks: 1,
                            uniqueUsers: { $size: "$uniqueUsers" },
                        },
                    },
                ],
            },
        },
    ]);
    return createSuccessResponse(MESSAGES.ANALYTICS_DATA_FOUND_FOR_SHORT_URL, {
        totalClicks: urlFromDb.totalClicks, 
        uniqueUsers: analytics[0].uniqueUsers?.[0]?.uniqueUserCount || 0,
        clicksByDate: analytics[0].clicksByDate || [],
        osType: analytics[0].osType || [],
        deviceType: analytics[0].deviceType || [],
    });  
};



urlAnalyticsController.getTopicBasedAnalytics = async(payload) => {
    const { topic } = payload;
    const urlsInTopic = await shortUrlServices.find({ topic }); 
    if (!urlsInTopic || urlsInTopic.length === 0) {
        return createErrorResponse(MESSAGES.NO_URLS_IN_TOPIC, CONSTANTS.ERROR_TYPES.DATA_NOT_FOUND);
    }
    const analytics = await urlAnalyticsServices.aggregate([
        { $match: { shortUrlId: { $in: urlsInTopic.map( (url) => url._id) } } },
        {
            $facet: {
                totalClicks: [{ $group: { _id: null, totalClicks: { $sum: 1 } } }],
                uniqueUsers: [{ $group: { _id: "$ipAddress" } }, { $count: "uniqueUserCount" }],
                clicksByDate: [
                    { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$clickTimestamp" } }, clickCount: { $sum: 1 } } },
                    { $sort: { _id: 1 } } ,
                ],
                urls: [
                    {
                        $group: {
                            _id: "$shortUrlId",
                            totalClicks: { $sum: 1 },
                            uniqueUsers: { $addToSet: "$ipAddress" }, 
                        } ,
                    },
                    {
                        $project: {
                            _id : 0 ,
                            shortUrl: "$_id",
                            totalClicks: 1,
                            uniqueUsers: { $size: "$uniqueUsers" },
                        } ,
                    } ,
                ] ,
            } , 
        } ,
    ]);
    return createSuccessResponse(MESSAGES.ANALYTICS_DATA_FOUND_FOR_TOPIC, {
        totalClicks: analytics[0].totalClicks[0]?.totalClicks || 0,
        uniqueUsers: analytics[0].uniqueUsers?.[0]?.uniqueUserCount || 0,
        clicksByDate: analytics[0].clicksByDate || [],
        urls: analytics[0].urls || [],
    });
};


urlAnalyticsController.getOverallAnalytics = async(payload) => {
    const userId = payload.userId;
    const urlsCreatedByUser = await shortUrlServices.find({ userId });
    if (!urlsCreatedByUser.length) {
        return createErrorResponse(MESSAGES.NO_URLS_FOUND_FOR_USER, CONSTANTS.ERROR_TYPES.DATA_NOT_FOUND);
    }
    const analytics = await urlAnalyticsServices.aggregate([
        { $match: { shortUrlId: { $in: urlsCreatedByUser.map((url) => url._id) } } },
        {
            $facet: {
                totalClicks: [{ $group: { _id: null, totalClicks: { $sum: 1 } } }],
                uniqueUsers: [
                    { $group: { _id: "$ipAddress" } },
                    { $count: "uniqueUserCount" } ,
                ],
                clicksByDate: [
                    { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$clickTimestamp" } }, clickCount: { $sum: 1 } } },
                    { $sort: { _id: 1 } } ,
                ],
                osType: [
                    { $group: { _id: "$osName", uniqueClicks: { $sum: 1 }, uniqueUsers: { $addToSet: "$ipAddress" } } },
                    { $project: { _id : 0 , osName: "$_id", uniqueClicks: 1, uniqueUsers: { $size: "$uniqueUsers" } } } ,
                ],
                deviceType: [
                    { $group: { _id: "$deviceType", uniqueClicks: { $sum: 1 }, uniqueUsers: { $addToSet: "$ipAddress" } } },
                    { $project: { _id : 0 , deviceName: "$_id", uniqueClicks: 1, uniqueUsers: { $size: "$uniqueUsers" } } } ,
                ] ,
            } ,
        } ,
    ]);
    return createSuccessResponse(MESSAGES.ANALYTICS_DATA_FOUND_FOR_USER, {
        totalUrls: urlsCreatedByUser.length,
        totalClicks: analytics[0].totalClicks?.[0]?.totalClicks || 0,
        uniqueUsers: analytics[0].uniqueUsers?.[0]?.uniqueUserCount || 0,
        clicksByDate: analytics[0].clicksByDate || [],
        osType: analytics[0].osType || [],
        deviceType: analytics[0].deviceType || [],
    });
};
