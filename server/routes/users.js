import express from "express";
import {
  getCustomers,
  search,
  getClient,
  addUser,
  assignToEvent,
  deleteAssignedClass,
  getTrainers,
  deleteUser,
} from "../controllers/user.js";

const router = express.Router();

router.get("/getCustomers", getCustomers);
router.get("/getTrainers", getTrainers);
router.get("/search", search);
router.get("/getClient/:client_id", getClient);
router.delete("/deleteUser/:client_id", deleteUser);
router.post("/addUser", addUser);
router.post("/assignToEvent", assignToEvent);
router.delete("/deleteAssignedClass/:assignId", deleteAssignedClass);

export default router;
