import express from "express";
import {
  saveEvent,
  getEvents,
  getSessions,
  getEventTime,
  getEvent,
  getEventCustomers,
  saveCalendarEvent,
  getThisCustomerEvents,
  deleteEvent,
} from "../controllers/event.js";

const router = express.Router();

router.post("/addEvent", saveEvent);
router.post("/saveCalendarEvent", saveCalendarEvent);
router.get("/getEvents", getEvents);
router.get("/getSessions", getSessions);
router.get("/getEventTime/:tm", getEventTime);
router.get("/getEvent/:eventId", getEvent);
router.get("/getEventCustomers/:eventId", getEventCustomers);
router.get("/getThisCustomerEvents/:userId", getThisCustomerEvents);
router.delete("/deleteEvent/:eventId", deleteEvent);

export default router;
