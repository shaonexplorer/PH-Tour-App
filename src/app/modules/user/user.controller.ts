import { Request, Response } from "express";
import { userServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await userServices.getUsers(req);

  sendResponse(res, { success: true, status: 200, data: users });
});

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userServices.createUser(req.body);

  sendResponse(res, { status: 201, success: true, data: user });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const updatedUser = await userServices.updateUser(req);

  sendResponse(res, { status: 201, success: true, data: updatedUser });
});

export const userController = { createUser, getUsers, updateUser };
