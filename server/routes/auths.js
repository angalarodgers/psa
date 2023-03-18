import express from "express";
import {
  loginAdmin,
  loginClient,
  loginTrainer,
  register,
  logout,
  sendOtp,
  confirmOTP,
  changePassword,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/loginAdmin", loginAdmin);
router.post("/loginTrainer", loginTrainer);
router.post("/loginClient", loginClient);
router.post("/register", register);
router.post("/logout", logout);
router.post("/sendOtp", sendOtp);
router.post("/confirmOTP", confirmOTP);
router.post("/changePassword", changePassword);

export default router;
