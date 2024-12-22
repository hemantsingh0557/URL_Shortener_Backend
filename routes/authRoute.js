
import express from "express";
import passport from "passport";


const authRoutes = express.Router();

authRoutes.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"], 
}));

authRoutes.get("/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
        res.json({ message: "Logged in successfully", user: req.user });
    },
);

export default authRoutes;



