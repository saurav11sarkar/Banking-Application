import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";

const login = catchAsync(async (req, res) => {
  const result = await authService.login(req.body);
  res.cookie("token", result.token, {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
  sendResponse(res, 200, "user login successfully", result.token);
});

export const authController = {
  login,
};
