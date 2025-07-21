import express from "express";
import { authenticateByRoles } from "../../middlewares/authenticate";
import { Role } from "../user/user.interface";
import { zodValidation } from "../../middlewares/zodValidation";
import { createBookingZodSchema } from "../../zod/booking.schema";
import { BookingController } from "./booking.controller";

const router = express.Router();

router.post(
  "/",
  authenticateByRoles(...Object.values(Role)),
  zodValidation(createBookingZodSchema),
  BookingController.createBooking
);

export const BookingRouter = router;
