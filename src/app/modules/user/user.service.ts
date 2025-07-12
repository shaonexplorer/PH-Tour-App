import { User } from "./user.model";
import { IUser, Role } from "./user.interface";
import bcrypt from "bcrypt";
import { Request } from "express";
import jwt from "jsonwebtoken";

const createUser = async (body: Partial<IUser>) => {
  const hashedPassword = await bcrypt.hash(body.password as string, 10);
  const auths = { provider: "credential", providerId: body.email };
  const newUser = await User.create({
    ...body,
    password: hashedPassword,
    auths: [auths],
  });
  return newUser;
};

const getUsers = async () => {
  const allUsers = await User.find();
  return allUsers;
};

const updateUser = async (req: Request) => {
  const { id } = req.params;

  const token = req.headers.authorization;
  const verifiedToken = jwt.verify(
    token as string,
    "abirhasankhan01680051016"
  ) as any;

  if (req.body.role) {
    if (verifiedToken.role == Role.ADMIN && req.body.role == Role.SUPER_ADMIN) {
      throw new Error("you are not authorized");
    }

    if (verifiedToken.role == Role.USER || Role.GUIDE) {
      throw new Error("you are not authorized");
    }
  }

  if (req.body.isDeleted || req.body.isActive || req.body.isVerified) {
    if (![Role.ADMIN, Role.SUPER_ADMIN].includes(verifiedToken.role)) {
      throw new Error("you are not authorized");
    }
  }
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }

  const updatedUser = await User.findOneAndUpdate({ _id: id }, req.body, {
    runValidators: true,
    new: true,
  });
  return updatedUser;
};

export const userServices = {
  createUser,
  getUsers,
  updateUser,
};
