import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";

const register = catchAsync(async (req, res) => {
  const result = await userService.register(req.body);
  sendResponse(res, 201, "User register is successfully", result);
});

export const userController = {
  register,
};
