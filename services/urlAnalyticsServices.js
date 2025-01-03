import { UrlAnalyticsModel } from "../models/index.js";


export const urlAnalyticsServices = {} ;


urlAnalyticsServices.findOne = async(criteria) => UrlAnalyticsModel.findOne(criteria) ;

urlAnalyticsServices.create = async(criteria) => UrlAnalyticsModel.create(criteria) ;

urlAnalyticsServices.aggregate = async(criteria) => UrlAnalyticsModel.aggregate(criteria) ;
