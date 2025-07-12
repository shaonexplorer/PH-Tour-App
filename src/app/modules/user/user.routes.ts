import express from "express";
import { userController } from "./user.controller";
import { zodValidation } from "../../middlewares/zodValidation";
import { createUserZodSchema } from "../../zod/createUserSchema";
import jwt from "jsonwebtoken";
import { Role } from "./user.interface";
import { authenticateByRoles } from "../../middlewares/authenticate";
import { updateUserZodSchema } from "../../zod/updateUserSchema";

const router = express.Router();

router.get(
  "/all-users",
  authenticateByRoles(Role.ADMIN, Role.SUPER_ADMIN),
  userController.getUsers
);

router.post("/", zodValidation(createUserZodSchema), userController.createUser);
router.patch(
  "/:id",
  zodValidation(updateUserZodSchema),
  authenticateByRoles(...Object.values(Role)),
  userController.updateUser
);

export const UserRouter = router;
