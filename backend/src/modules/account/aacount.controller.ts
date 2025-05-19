import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { AccountService } from "./account.service";

const getAccount = catchAsync(async (req, res) => {
  const account = await AccountService.getAccount(req.user?._id);
  sendResponse(res, 200, "Account fetched successfully", account);
});

export const AccountController = {
  getAccount,
};
