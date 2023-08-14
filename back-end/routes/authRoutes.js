import express from "express";
import cors from "cors";
import {
  forgotPassword,
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  test,
  verifyEmail,
} from "../controllers/authController.js";
import { isResetTokenValid } from "../helpers/auth.js";

const router = express.Router();

router.use(
  cors({
    credentials: true,
    origin: "https://digital-wallet.onrender.com " || "http://localhost:7000",
    // origin: 'http://localhost:3000' || 'https://digital-credentials-wallet-git-latest-iamlam163.vercel.app'
  }),
);

router.get("/", test);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/verify-email/:id", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", isResetTokenValid, resetPassword);
router.get("/profile", getProfile);

export default router;
