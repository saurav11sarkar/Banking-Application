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

const claimFixDeposit = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await fixDepositService.claimFixDeposit(id, req.user?._id);
  sendResponse(res, 200, "Fix Deposit claimed successfully", result);
});

const getAllFixDeposit = catchAsync(async (req, res) => {
  const result = await fixDepositService.getAllFixDeposit(req.user?._id);
  sendResponse(res, 200, "Fix Deposit fetched successfully", result);
});

export const fixDepositController = {
  createFixDeposit,
  claimFixDeposit,
  getAllFixDeposit,
};



