import express from "express";
import {
  googleLogin,
  login,
  register,
  resetPassword,
  sendOtp,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/google-login", googleLogin);
router.post("/reset-password", resetPassword);
router.post("/send-otp", sendOtp);

export default router;
