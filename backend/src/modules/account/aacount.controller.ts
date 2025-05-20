import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { AccountService } from "./account.service";

const getAccount = catchAsync(async (req, res) => {
  const account = await AccountService.getAccount(req.user?._id);
  sendResponse(res, 200, "Account fetched successfully", account);
});

const allOrdersTransaction = catchAsync(async (req, res) => {
  const orders = await AccountService.allOrdersTransaction(req.user?._id);
  sendResponse(res, 200, "Orders fetched successfully", orders);
});

export const AccountController = {
  getAccount,
  allOrdersTransaction,
};
