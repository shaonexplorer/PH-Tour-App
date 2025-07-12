import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { authServices } from "./auth.service";
import { sendResponse } from "../../../utils/sendResponse";

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = await authServices.login(req.body, next);

    sendResponse(res, {
      success: true,
      status: 200,
      data: { message: "login successfull", token },
    });
  }
);

export const authController = { login };
