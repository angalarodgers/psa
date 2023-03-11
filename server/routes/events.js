import express from "express";
import {
  saveEvent,
  getEvents,
  getSessions,
  getEventTime,
  getEvent,
  getEventCustomers,
} from "../controllers/event.js";

const router = express.Router();

router.post("/addEvent", saveEvent);
router.get("/getEvents", getEvents);
router.get("/getSessions", getSessions);
router.get("/getEventTime/:tm", getEventTime);
router.get("/getEvent/:eventId", getEvent);
router.get("/getEventCustomers/:eventId", getEventCustomers);

export default router;
