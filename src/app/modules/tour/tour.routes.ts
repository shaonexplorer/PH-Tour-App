import express from "express";
import { zodValidation } from "../../middlewares/zodValidation";
import { authenticateByRoles } from "../../middlewares/authenticate";
import { Role } from "../user/user.interface";

import {
  createTourTypeZodSchema,
  createTourZodSchema,
  updateTourZodSchema,
} from "../../zod/tour.schema";
import { TourController } from "./controller.tour";

const router = express.Router();

// router.post(
//   "/create-tour-type",
//   zodValidation(createTourTypeZodSchema),
//   authenticateByRoles(Role.ADMIN, Role.SUPER_ADMIN),
//   tourController.createTourType
// );

/* ------------------ TOUR TYPE ROUTES -------------------- */
// router.get("/tour-types", TourController.getAllTourTypes);

router.post(
  "/create-tour-type",
  authenticateByRoles(Role.ADMIN, Role.SUPER_ADMIN),
  zodValidation(createTourTypeZodSchema),
  TourController.createTourType
);

// router.get("/tour-types/:id", TourController.getSingleTourType);

// router.patch(
//   "/tour-types/:id",
//   authenticateByRoles(Role.ADMIN, Role.SUPER_ADMIN),
//   zodValidation(createTourTypeZodSchema),
//   TourController.updateTourType
// );

// router.delete(
//   "/tour-types/:id",
//   authenticateByRoles(Role.ADMIN, Role.SUPER_ADMIN),
//   TourController.deleteTourType
// );

/* --------------------- TOUR ROUTES ---------------------- */
router.get("/", TourController.getAllTours);

router.post(
  "/create",
  authenticateByRoles(Role.ADMIN, Role.SUPER_ADMIN),
  zodValidation(createTourZodSchema),
  TourController.createTour
);

// router.get("/:slug", TourController.getSingleTour);

// router.patch(
//   "/:id",
//   authenticateByRoles(Role.ADMIN, Role.SUPER_ADMIN),
//   zodValidation(updateTourZodSchema),
//   TourController.updateTour
// );

// router.delete(
//   "/:id",
//   authenticateByRoles(Role.ADMIN, Role.SUPER_ADMIN),
//   TourController.deleteTour
// );

export const tourRouter = router;
