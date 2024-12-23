import express from "express";
import passport from "passport";
import { generateJWTAccessToken } from "../utils/helperFunctions.js";
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
    const { googleId, email, name } = req.user;
    const tokenPayload = {
        id: googleId,
        email,
        name,
    };
    const token = generateJWTAccessToken(tokenPayload);
    return res.json(createSuccessResponse(MESSAGES.LoggedInSuccessfully, {
        token,
        user: req.user,
    }));
});
