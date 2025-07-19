import express from "express";
import { zodValidation } from "../../middlewares/zodValidation";
import { authenticateByRoles } from "../../middlewares/authenticate";
import {
  zodDivisionSchema,
  zodDivisionSchemaUpdate,
} from "../../zod/create.division.schema";
import { Role } from "../user/user.interface";
import { divisionController } from "./controller.division";

const router = express.Router();

router.post(
  "/create",
  zodValidation(zodDivisionSchema),
  authenticateByRoles(Role.ADMIN, Role.SUPER_ADMIN),
  divisionController.createDivision
);

router.get(
  "/",
  authenticateByRoles(Role.ADMIN, Role.SUPER_ADMIN),
  divisionController.getDivisions
);

router.patch(
  "/:id",
  zodValidation(zodDivisionSchemaUpdate),
  authenticateByRoles(Role.ADMIN, Role.SUPER_ADMIN),
  divisionController.updateDivisionById
);
export const divisionRouter = router;
