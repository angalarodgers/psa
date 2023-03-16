import express from "express";
import {
  makePay,
  getPay,
  getBalance,
  getAllPay,
  addPay,
  getCustomerPays,
} from "../controllers/pay.js";

const router = express.Router();

router.post("/makepay", makePay);
router.get("/getpay", getPay);
router.get("/getbalance", getBalance);
router.get("/getAllpay", getAllPay);
router.post("/addPay", addPay);
router.get("/getCustomerPays/:userId", getCustomerPays);

export default router;
