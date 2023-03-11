import express from "express";
import {
  makePay,
  getPay,
  getBalance,
  getAllPay,
  addPay,
} from "../controllers/pay.js";

const router = express.Router();

router.post("/makepay", makePay);
router.get("/getpay", getPay);
router.get("/getbalance", getBalance);
router.get("/getAllpay", getAllPay);
router.post("/addPay", addPay);

export default router;
