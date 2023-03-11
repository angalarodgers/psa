import express from "express";
import {
  login,
  register,
  logout,
  sendOtp,
  confirmOTP,
  changePassword,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/sendOtp", sendOtp);
router.post("/confirmOTP", confirmOTP);
router.post("/changePassword", changePassword);

export default router;
