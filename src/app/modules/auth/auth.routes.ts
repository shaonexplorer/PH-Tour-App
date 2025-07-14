import express from "express";
import { authController } from "./auth.controller";
import passport from "passport";

const router = express.Router();

router.post("/", authController.login);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    scope: ["profile"],
    failureRedirect: "/",
  }),
  async (req, res) => {
    res.redirect("https://vercel.com/abir-hasan-khans-projects");
  }
);

export const authRouter = router;
