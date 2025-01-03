import { CONSTANTS } from "../utils/constants.js";
import { MESSAGES } from "../utils/messages.js";
import { createErrorResponse, createSuccessResponse } from "../utils/responseHelper.js";
import { shortUrlServices, urlAnalyticsServices } from "../services/index.js";
import { helperFunctions } from "../utils/helperFunctions.js";
import redisClient from "../config/redis.js";


export const shortUrlController = {} ;

shortUrlController.createShortUrl = async(payload) => {
    const { userId , longUrl, customAlias, topic } = payload;
    const isLongUrlAlreadyShortenedForUser = await shortUrlServices.findOne({ userId : userId , longUrl : longUrl }) ;
    if( isLongUrlAlreadyShortenedForUser ) {
        return createErrorResponse( MESSAGES.LONG_URL_ALREADY_SHORTENED , CONSTANTS.ERROR_TYPES.ALREADY_EXISTS ) ;
    }
    let shortUrl ;
    if (customAlias) {
        const existingAlias = await shortUrlServices.findOne({ shortUrl: customAlias });
        if (existingAlias) {
            return createErrorResponse(MESSAGES.ALIAS_ALREADY_EXISTS, CONSTANTS.ERROR_TYPES.ALREADY_EXISTS );
        }
        shortUrl = customAlias;
    } 
    else {
        shortUrl = helperFunctions.generateRandomString(8); // 8 is length of random short url 
    }
    const newShortUrl = await shortUrlServices.create({
        userId, 
        longUrl,
        shortUrl,
        customAlias,
        topic,
    });
    await redisClient.set(shortUrl, longUrl);
    return createSuccessResponse(MESSAGES.SHORT_URL_CREATED, {
        shortUrl: newShortUrl.shortUrl,
        longUrl: newShortUrl.longUrl,
        createdAt: newShortUrl.createdAt,
    });
        
} ;


shortUrlController.getLongUrlOfShortUrl = async(payload) => {
    const { alias , userIpAddress , userDeviceType , userOsType } = payload;
    const urlFromDb = await shortUrlServices.findOne({ shortUrl: alias });
    if (!urlFromDb) {
        return createErrorResponse(MESSAGES.LONG_URL_NOT_FOUND, CONSTANTS.ERROR_TYPES.DATA_NOT_FOUND);
    }
    const geolocation = helperFunctions.getGeolocation(userIpAddress) ;
    await urlAnalyticsServices.create({
        shortUrlId: urlFromDb._id,
        clickTimestamp: Date.now(),
        osName: userOsType,
        deviceType: userDeviceType,
        ipAddress: userIpAddress,
        geolocation: geolocation, 
    });
    const redirectResponse = createSuccessResponse(MESSAGES.REDIRECTING, {
        longUrl: urlFromDb.longUrl,
        redirectUrl: urlFromDb.longUrl,
    });
    return redirectResponse;
};


