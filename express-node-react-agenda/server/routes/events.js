import express from "express";
import {getEvents, createEvent, getEvent, deleteEvent, updateEvent} from "../controllers/eventsController.js";

const router = express.Router();

router.get("/events", getEvents);
router.post("/event", createEvent);
router.get("/event/:id", getEvent);
router.delete("/event/:id", deleteEvent);
router.put("/event/:id", updateEvent)


export default router;


