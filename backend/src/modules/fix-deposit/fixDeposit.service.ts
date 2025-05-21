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

    const account = await Account.findById(payload.account).session(session);
    if (!account) throw new AppError(404, "Account not found");

    if (payload.amount > account.total_balance) {
      throw new AppError(400, "Insufficient balance");
    }

    if (
      user.accountType === "current" &&
      account.total_balance <= Account_LIMIT.current
    ) {
      throw new AppError(400, "Account limit exceeded");
    }

    // Interest logic based on duration
    const interestRate = payload.duration < 12 ? 2.5 : 5.5;
    const interest = (payload.amount * interestRate) / 100;
    const totalAmount = payload.amount + interest;

    const fixDeposit = await FixDeposit.create(
      [
        {
          ...payload,
          user: user._id,
          account: account._id,
          interest_amount: interest,
          total_amount: totalAmount,
        },
      ],
      { session }
    );

    // Deduct deposit amount from account
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

const claimFixDeposit = async (depositId: string, userId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const fixDeposit = await FixDeposit.findOne({
      _id: depositId,
      user: userId,
    }).session(session);
    if (!fixDeposit) throw new AppError(404, "Fixed deposit not found");
    if (fixDeposit.isClaimed) throw new AppError(400, "Already claimed");

    const account = await Account.findById(fixDeposit.account).session(session);
    if (!account) throw new AppError(404, "Account not found");

    const createdAt = fixDeposit.createdAt!;
    const now = new Date();
    const diffInMonths =
      (now.getFullYear() - createdAt.getFullYear()) * 12 +
      (now.getMonth() - createdAt.getMonth());

    let amountToAdd = fixDeposit.amount;

    if (diffInMonths >= fixDeposit.duration) {
      amountToAdd += fixDeposit.interest_amount;
    }

    fixDeposit.isClaimed = true;
    fixDeposit.claimed_date = now;

    await fixDeposit.save({ session });
    account.total_balance += amountToAdd;
    await account.save({ session });

    await session.commitTransaction();
    return fixDeposit;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getAllFixDeposit = async (userId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const fixDeposit = await FixDeposit.find({ user: userId })
      // .populate("user")
      // .populate("account")
      .session(session);
    const fixDepositData: any = [];
    if (fixDeposit) {
      fixDeposit.map((item) => {
        fixDepositData.push({
          _id: item._id,
          amount: item.amount,
          duration: item.duration,
          interest_amount: item.interest_amount,
          total_amount: item.total_amount,
        });
      });
    }
    const totalAmount = fixDepositData.reduce(
      (acc: number, curr: any) => acc + curr.total_amount,
      0
    );
    fixDepositData.push({ totalAmount });
    await session.commitTransaction();
    session.endSession();
    return { fixDeposit, fixDepositData, totalAmount };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const fixDepositService = {
  createFixDeposit,
  claimFixDeposit,
  getAllFixDeposit,
};
