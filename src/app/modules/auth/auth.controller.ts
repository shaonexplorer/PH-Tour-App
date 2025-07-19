import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import passport from "passport";
import { IUser } from "../user/user.interface";
import jwt from "jsonwebtoken";
import "dotenv/config";

// const login = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const token = await authServices.login(req.body, next);

//     sendResponse(res, {
//       success: true,
//       status: 200,
//       data: { message: "login successfull", token },
//     });
//   }
// );

const jwtSecret = process.env.JWT_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "local",
      async (err: any, user: Partial<IUser>, info: any) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next("email not found");
        }

        const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
            role: user.role,
          },
          jwtSecret as string,
          { expiresIn: "30d" }
        );

        const refreshToken = jwt.sign(
          {
            id: user._id,
            email: user.email,
            role: user.role,
          },
          refreshSecret as string,
          { expiresIn: "60d" }
        );

        res.cookie("accessToken", token, { httpOnly: true, secure: false });

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
        });

        res
          .status(200)
          .json({ status: "success", message: "login successfull", user });
      }
    )(req, res, next);
  }
);
export const authController = { login };
