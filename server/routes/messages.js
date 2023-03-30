import express from "express";
import {
  getMessages,
  sendMessage,
  sendAdminMessage,
} from "../controllers/message.js";

const router = express.Router();

router.get("/getMessages", getMessages);
router.post("/sendMessage", sendMessage);
router.post("/sendAdminMessage", sendAdminMessage);

export default router;
