import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { fixDepositService } from "./fixDeposit.service";

const createFixDeposit = catchAsync(async (req, res) => {
  const result = await fixDepositService.createFixDeposit(
    req.body,
    req.user?._id
  );
  sendResponse(res, 201, "Fix Deposit created successfully", result);
});

export const fixDepositController = {
  createFixDeposit,
};
