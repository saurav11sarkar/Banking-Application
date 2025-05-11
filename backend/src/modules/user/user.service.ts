import AppError from "../../errors/appError";
import { IUser } from "./user.interface";
import User from "./user.model";

const register = async (payload: IUser) => {
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError(400, "Email already exists");
  }
  const result = await User.create(payload);
  return result;
};

const profile = async (payload: IUser) => {
  const result = await User.findById(payload._id).select("-password -_id");
  if (!result) {
    throw new AppError(404, "User not found");
  }
  return result;
};

export const userService = {
  register,
  profile,
};
