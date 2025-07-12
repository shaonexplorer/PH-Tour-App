import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Role } from "../modules/user/user.interface";

export const authenticateByRoles =
  (...role: Partial<Role>[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    const verifiedToken = jwt.verify(
      token as string,
      "abirhasankhan01680051016"
    ) as any;

    if (!role.includes(verifiedToken.role)) {
      throw new Error("your are not authorized");
    } else {
      next();
    }
  };
