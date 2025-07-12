import { NextFunction } from "express";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const login = async (payload: Partial<IUser>, next: NextFunction) => {
  const isUserExist = await User.findOne({ email: payload.email });

  const jwtSecret = process.env.JWT_SECRET;

  console.log(jwtSecret);

  if (!isUserExist) {
    throw new Error("email not found");
  }

  const isPasswordMatch = await bcrypt.compare(
    payload.password as string,
    isUserExist.password as string
  );

  if (!isPasswordMatch) {
    throw new Error("password does not match");
  }

  const token = jwt.sign(
    { id: isUserExist._id, email: isUserExist.email, role: isUserExist.role },
    jwtSecret as string,
    { expiresIn: "1d" }
  );
  return token;
};

export const authServices = { login };
