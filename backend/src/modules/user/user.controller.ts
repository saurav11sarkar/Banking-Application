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

export const userController = {
  register,
  profile,
};
