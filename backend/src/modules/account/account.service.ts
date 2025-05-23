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



interface IAllTransactionsResponse {
  orders: any[]; // Replace `any` with specific order interface if defined
  fixDeposits: {
    claimed: any[];   // Replace `any` with IFixDeposit if you have the interface
    unclaimed: any[];
  };
}

const allOrdersTransaction = async (
  userId: string
): Promise<IAllTransactionsResponse> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const orders = await Order.find({ userId })
      .populate("userId")
      .sort({ createdAt: -1 })
      .session(session);

    const allFixDeposits = await FixDeposit.find({ user: userId })
      .populate("user")
      .sort({ createdAt: -1 })
      .session(session);

    const claimed = allFixDeposits.filter((fd) => fd.isClaimed);
    const unclaimed = allFixDeposits.filter((fd) => !fd.isClaimed);

    await session.commitTransaction();
    session.endSession();

    return {
      orders,
      fixDeposits: {
        claimed,
        unclaimed,
      },
    };
  } catch (error) {
    await session.abortTransaction();
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
