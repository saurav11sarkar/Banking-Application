import mongoose from "mongoose";
import { IFixDeposit } from "./fixDeposit.interface";
import User from "../user/user.model";
import AppError from "../../errors/appError";
import Account from "../account/account.model";
import { Account_LIMIT } from "../../utils/constain";
import FixDeposit from "./fixDeposit.model";

const createFixDeposit = async (payload: IFixDeposit, userId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(userId).session(session);
    if (!user) throw new AppError(404, "User not found");

    const account = await Account.findOne({ userId }).session(session);
    if (!account) throw new AppError(404, "Account not found");

    if (payload.amount > account.total_balance) {
      throw new AppError(400, "Insufficient balance");
    }

    if (user.accountType === "current" && account.total_balance <= Account_LIMIT.current) {
      throw new AppError(400, "Account limit exceeded");
    }

    const interest = (payload.amount * 10) / 100;
    const totalAmount = payload.amount + interest;

    const fixDeposit = await FixDeposit.create(
      [
        {
          ...payload,
          user: user._id,
          account: account._id,
          total_amount: totalAmount,
          interest_amount: interest,
        },
      ],
      { session }
    );

    account.total_balance -= payload.amount;
    await account.save({ session });

    await session.commitTransaction();
    return fixDeposit[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const fixDepositService = {
  createFixDeposit,
};
