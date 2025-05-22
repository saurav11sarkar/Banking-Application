import mongoose from "mongoose";
import AppError from "../../errors/appError";

import Account from "./account.model";

import Order from "../order/order.model";
import FixDeposit from "../fix-deposit/fixDeposit.model";

const getAccount = async (userId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const account = await Account.findOne({ userId: userId }).session(session);
    // console.log("account", account);
    if (!account) {
      throw new AppError(404, "Account not found");
    }
    await session.commitTransaction();
    session.endSession();
    return account;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const allOrdersTransaction = async (userId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const orders = await Order.find({ userId: userId })
      .populate("userId")
      .sort({ createdAt: -1 })
      .session(session);
    
    const fixDeposits = await FixDeposit.find({ user: userId })
      .populate("user")
      .sort({ createdAt: -1 })
      .session(session);

    await session.commitTransaction();
    session.endSession();
    return { orders, fixDeposits };
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getAccountNumber = async (userId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const account = await Account.findOne({ userId: userId })
      .select("_id , total_balance")
      .session(session);
    if (!account) {
      throw new AppError(404, "Account not found");
    }
    await session.commitTransaction();
    session.endSession();
    return account;
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const AccountService = {
  getAccount,
  allOrdersTransaction,
  getAccountNumber,
};
