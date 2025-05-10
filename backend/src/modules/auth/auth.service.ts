import config from "../../config";
import AppError from "../../errors/appError";
import User from "../user/user.model";
import { ILogin } from "./auth.interface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (payload: ILogin) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(400, "User not found");
  }
  const isPasswordValid = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordValid) {
    throw new AppError(400, "Invalid password");
  }
  const jwtPayloadToken = {
    id: user._id,
    email: user.email,
    name: user.name,
  };
  const token = jwt.sign(jwtPayloadToken, config.JWT_SECRET as string, {
    expiresIn: "1d",
  });
  return { user, token };
};

export const authService = {
  login,
};
