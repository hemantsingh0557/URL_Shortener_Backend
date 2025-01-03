import Joi from "joi";
import { urlAnalyticsController } from "../controllers/index.js";


export const urlAnalyticsRoutes = [
    {
        method: "get",
        path : "/api/analytics/:alias",
        schema : {
            params : Joi.object({
                alias : Joi.string().required(),
            }).required(),
        },
        auth : true ,
        controller : urlAnalyticsController.getShortUrlAnalytics,
    } ,
    {
        method: "get",
        path: "/api/analytics/topic/:topic",
        schema: {
            params: Joi.object({
                topic: Joi.string().required(),
            }).required(),
        },
        auth: true,
        controller: urlAnalyticsController.getTopicBasedAnalytics,
    },
    {
        method: "get",
        path: "/api/analytics/overall",
        schema: {
            params: Joi.object({}).required(),
        },
        auth: true,
        controller: urlAnalyticsController.getOverallAnalytics,
    },
] ;