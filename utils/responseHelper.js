import { CONSTANTS } from "./constants.js";

const RESPONSE = {
    ERROR: {
        DATA_NOT_FOUND: (msg = "") => ({
            statusCode: 404,
            message: msg,
            status: false,
            type: CONSTANTS.ERROR_TYPES.DATA_NOT_FOUND,
        }),
        BAD_REQUEST: (msg = "", data) => {
            let obj = {
                statusCode: 400,
                status: false,
                message: msg,
                type: CONSTANTS.ERROR_TYPES.BAD_REQUEST,
            };
            if (data) {
                obj = { ...obj, data };
            }
            return obj;
        },
        ALREADY_EXISTS: (msg = "") => ({
            statusCode: 400,
            message: msg,
            status: false,
            type: CONSTANTS.ERROR_TYPES.ALREADY_EXISTS,
        }),
        FORBIDDEN: (msg = "") => ({
            statusCode: 403,
            message: msg,
            status: false,
            type: CONSTANTS.ERROR_TYPES.FORBIDDEN,
        }),
        INTERNAL_SERVER_ERROR: (msg = "") => ({
            statusCode: 500,
            message: msg,
            status: false,
            type: CONSTANTS.ERROR_TYPES.INTERNAL_SERVER_ERROR,
        }),
        UNAUTHORIZED: (msg = "") => ({
            statusCode: 401,
            message: msg,
            status: false,
            type: CONSTANTS.ERROR_TYPES.UNAUTHORIZED,
        }),
    },
    SUCCESS: {
        MISSCELANEOUSAPI: (msg = "", data) => {
            let obj = {
                statusCode: 200,
                status: true,
                message: msg,
                type: CONSTANTS.SUCCESS.SUCCESS,
            };
            if (data) {
                obj = { ...obj, data };
            }
            return obj;
        },
        WITHOUTSTATUSRES: (data) => {
            let obj = {};
            if (data) {
                obj = { ...data };
            }
            return obj;
        },
    },
};
  
/**
 * function to create a valid SUCCESS response object.
 * message that has to be pass in the response object.
 */
function createSuccessResponse(message, data) {
    return RESPONSE.SUCCESS.MISSCELANEOUSAPI(message, data);
}

/**
 * function to create a valid SUCCESS response object without status data.
 * data that has to be sent in the response object.
 */
function createSuccessResponseWithoutStatus(data) {
    return RESPONSE.SUCCESS.WITHOUTSTATUSRES(data);
}

/**
 * function to create a valid ERROR response object.
 * message that has to be pass in the response object.
 */
function createErrorResponse(message, errorType, data) {
    return RESPONSE.ERROR[errorType](message, data);
}
  
export { createErrorResponse, createSuccessResponse, createSuccessResponseWithoutStatus };
  