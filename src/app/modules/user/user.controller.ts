import { Request, Response } from "express";
import { userServices } from "./user.service";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// export const createUser = async (req: Request, res: Response) => {
//   try {
//     const user = await userServices.createUser(req.body);
//     res.status(201).json({ success: true, data: user });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const createUser = catchAsync(async (req, res) => {
  const user = await userServices.createUser(req.body);
  // res.status(201).json({ successs: true, data: user });

  sendResponse(res, { status: 201, success: true, data: user });
});
