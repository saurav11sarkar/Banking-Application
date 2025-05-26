import AppError from "../../errors/appError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { IUser } from "./user.interface";
import { userService } from "./user.service";

const register = catchAsync(async (req, res) => {
  const result = await userService.register(req.body);
  sendResponse(res, 201, "User register is successfully", result);
});

const profile = catchAsync(async (req, res) => {
  const result = await userService.profile(req.user as IUser);
  sendResponse(res, 200, "User profile retrieved successfully", result);
});

const updateProfile = catchAsync(async (req, res) => {
  const file = req.file as Express.Multer.File | undefined;
  const formData = JSON.parse(req.body.data);

  const result = await userService.updateProfile(formData, file, req.user?._id);
  sendResponse(res, 200, "User profile updated successfully", result);
});


export const userController = {
  register,
  profile,
  updateProfile,
};
