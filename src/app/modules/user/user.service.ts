import { User } from "./user.model";
import { IUser } from "./user.interface";

const createUser = async (body: Partial<IUser>) => {
  const newUser = await User.create(body);
  return newUser;
};

export const userServices = {
  createUser,
};
