import uploadImage from "../../middlewares/uploadImage";
import AppError from "../../errors/appError";
import { IUser } from "./user.interface";
import User from "./user.model";
import jwt from "jsonwebtoken";

const register = async (payload: IUser) => {
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError(400, "Email already exists");
  }
  const result = await User.create(payload);
  const { _id, name, email, accountType } = result;
  const token = jwt.sign(
    { _id, name, email, accountType },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );
  return { result, token };
};

const profile = async (payload: IUser) => {
  const result = await User.findById(payload._id).select("-password -_id");
  if (!result) {
    throw new AppError(404, "User not found");
  }
  return result;
};

const updateProfile = async (
  payload: Partial<IUser>,
  file: Express.Multer.File,
  userId: string
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, "User not found");
  }

  const img = await uploadImage(file);
  const result = await User.findByIdAndUpdate(
    userId,
    {
      ...payload,
      image: img,
    },
    { new: true }
  );
  return result;
};

export const userService = {
  register,
  profile,
  updateProfile,
};
