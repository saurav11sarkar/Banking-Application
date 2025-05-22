import mongoose from "mongoose";
import AppError from "../../errors/appError";
import FixDeposit from "./fixDeposit.model";
import Account from "../account/account.model";
import User from "../user/user.model";
import { Account_LIMIT } from "../../utils/constain";
import { IFixDeposit } from "./fixDeposit.interface";

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

    if (user.accountType === "current" && account.total_balance <= Account_LIMIT.current) {
      throw new AppError(400, "Account limit exceeded");
    }

    const interestRate = payload.amount > 1000 ? 0.5 : payload.amount > 500 ? 0.2 : 0.1;
    const interest = payload.amount * (interestRate / 100);
    const totalAmount = payload.amount + interest;

    const [fixDeposit] = await FixDeposit.create([{
      ...payload,
      user: user._id,
      account: account._id,
      interestRate,
      interest_amount: interest,
      total_amount: totalAmount,
    }], { session });

    account.total_balance -= payload.amount;
    account.all_transaction_id.push(fixDeposit._id as string);
    await account.save({ session });

    await session.commitTransaction();
    return fixDeposit;
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
    const fixDeposit = await FixDeposit.findOne({ _id: depositId, user: userId }).session(session);
    if (!fixDeposit) throw new AppError(404, "Fixed deposit not found");
    if (fixDeposit.isClaimed) throw new AppError(400, "Already claimed");

    const account = await Account.findById(fixDeposit.account).session(session);
    if (!account) throw new AppError(404, "Account not found");

    const now = new Date();
    const createdAt = fixDeposit.createdAt;
    if (!createdAt) throw new AppError(500, "Missing creation date");

    const days = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
    const dailyRate = fixDeposit.interestRate / 100 / 30;
    const earnedInterest = fixDeposit.amount * dailyRate * days;
    const totalAmount = fixDeposit.amount + earnedInterest;

    fixDeposit.isClaimed = true;
    fixDeposit.claimed_date = now;
    fixDeposit.interest_amount = earnedInterest;
    fixDeposit.total_amount = totalAmount;
    await fixDeposit.save({ session });

    account.total_balance += totalAmount;
    account.all_transaction_id.push(fixDeposit._id as string);
    await account.save({ session });

    await session.commitTransaction();
    return fixDeposit;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getAllFixDeposit = async (userId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const fixDeposits = await FixDeposit.find({
      user: userId,
      isClaimed: false,
    }).session(session);

    const fixDepositData = fixDeposits.map(fd => ({
      _id: fd._id,
      amount: fd.amount,
      interest_amount: fd.interest_amount,
      total_amount: fd.total_amount,
    }));

    const totalAmount = fixDepositData.reduce((acc, curr) => acc + curr.total_amount, 0);

    await session.commitTransaction();
    return { fixDeposits, fixDepositData, totalAmount };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const fixDepositService = {
  createFixDeposit,
  claimFixDeposit,
  getAllFixDeposit,
};
