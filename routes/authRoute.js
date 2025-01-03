import express from "express";
import passport from "passport";
import { helperFunctions } from "../utils/helperFunctions.js";
import { createErrorResponse, createSuccessResponse } from "../utils/responseHelper.js";
import { MESSAGES } from "../utils/messages.js";
import { CONSTANTS } from "../utils/constants.js";

export const authRoutes = express.Router();

authRoutes.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
}));

authRoutes.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), async(req, res) => {
    if (!req.user) {
        return res.status(401).json(createErrorResponse(MESSAGES.AuthenticationFailed, CONSTANTS.ERROR_TYPES.UNAUTHORIZED));
    }
    const { _id, email, name } = req.user;
    const tokenPayload = {
        userId : _id,
        email,
        name,
    };
    const token = helperFunctions.generateJWTAccessToken(tokenPayload);
    return res.json(createSuccessResponse(MESSAGES.LoggedInSuccessfully, {
        token,
        user: req.user,
    }));
});
