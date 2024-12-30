

const RESPONSE = {
    ERROR: {
        DATA_NOT_FOUND: function(msg) {
            return {
                statusCode: 404,
                message: msg || "",
                status: false,
                type: "DATA_NOT_FOUND",
            };
        },
        BAD_REQUEST: function(msg, data) {
            let obj = {
                statusCode: 400,
                status: false,
                message: msg || "",
                type: "BAD_REQUEST",
            };
            if (data) {
                obj = { ...obj, data };
            }
            return obj;
        },
        ALREADY_EXISTS: function(msg) {
            return {
                statusCode: 400,
                message: msg || "",
                status: false,
                type: "ALREADY_EXISTS",
            };
        },
        FORBIDDEN: function(msg) {
            return {
                statusCode: 403,
                message: msg || "",
                status: false,
                type: "FORBIDDEN",
            };
        },
        INTERNAL_SERVER_ERROR: function(msg) {
            return {
                statusCode: 500,
                message: msg || "",
                status: false,
                type: "INTERNAL_SERVER_ERROR",
            };
        },
        UNAUTHORIZED: function(msg) {
            return {
                statusCode: 401,
                message: msg || "",
                status: false,
                type: "UNAUTHORIZED",
            };
        },
    },

    SUCCESS: {
        GENERIC_SUCCESS: function(msg, data) {
            let obj = {
                statusCode: 200,
                status: true,
                message: msg || "",
                type: "SUCCESS",
            };
            if (data) {
                obj = { ...obj, data };
            }
            return obj;
        },
        WITHOUT_STATUS_RES: function(data) {
            let obj = {};
            if (data) {
                obj = { ...data };
            }
            return obj;
        },
    },
};


export function createSuccessResponse(message, data) {
    return RESPONSE.SUCCESS.GENERIC_SUCCESS(message, data);
}

export function createSuccessResponseWithoutStatus(data) {
    return RESPONSE.SUCCESS.WITHOUT_STATUS_RES(data);
}


export function createErrorResponse(message, errorType, data) {
    if (RESPONSE.ERROR[errorType]) {
        return RESPONSE.ERROR[errorType](message, data);
    } else {
        return RESPONSE.ERROR.INTERNAL_SERVER_ERROR("An unknown error occurred.");
    }
}




