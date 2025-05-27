import SSLCommerzPayment from "sslcommerz-lts";
import config from "../../config";
import { ObjectId } from "mongodb";

import User from "../user/user.model";
// import { IOrder } from "./order.interface";
import Order from "./order.model";
import AppError from "../../errors/appError";
import mongoose from "mongoose";
import Account from "../account/account.model";

const addAmount = async (
  payload: { amount: number; currency?: string },
  userId: string
) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { amount, currency = "BDT" } = payload;

    if (!userId) {
      throw new AppError(401, "Unauthorized user");
    }

    const user = await User.findById(userId).session(session);
    if (!user) {
      throw new AppError(404, "User not found");
    }

    const store_id = config.STORE_ID!;
    const store_passwd = config.STORE_PASSWD!;
    const is_live = false;

    const tran_id = new ObjectId().toString();

    const newOrder = new Order({
      amount,
      currency,
      paidStatus: false,
      tranjectionId: tran_id,
      userId,
    });
    await newOrder.save({ session });

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

    const data = {
      total_amount: amount,
      currency,
      tran_id,
      success_url: `http://localhost:5000/api/v1/order/success/${tran_id}`,
      fail_url: `http://localhost:5000/api/v1/order/fail/${tran_id}`,
      cancel_url: "http://localhost:3030/cancel",
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "Courier",
      product_name: "Add Balance",
      product_category: "Digital",
      product_profile: "general",

      cus_name: user.name || "Customer",
      cus_email: user.email || "example@email.com",
      cus_add1: "N/A",
      cus_add2: "N/A",
      cus_city: "N/A",
      cus_state: "N/A",
      cus_postcode: "0000",
      cus_country: "Bangladesh",
      cus_phone: "00000000000",
      cus_fax: "00000000000",

      ship_name: user.name || "Customer",
      ship_add1: "N/A",
      ship_add2: "N/A",
      ship_city: "N/A",
      ship_state: "N/A",
      ship_postcode: "0000",
      ship_country: "Bangladesh",
    };

    try {
      const response = await sslcz.init(data);
      const { GatewayPageURL } = response;

      if (!GatewayPageURL) {
        await Order.deleteOne({ tranjectionId: tran_id }, { session });
        throw new AppError(500, "Payment initialization failed.");
      }
      // console.log("GatewayPageURL", GatewayPageURL);

      await session.commitTransaction();
      await session.endSession();
      return { url: GatewayPageURL };
    } catch (error) {
      await Order.deleteOne({ tranjectionId: tran_id }, { session });
      // console.error("SSLCommerz Init Error:", error);
      await session.abortTransaction();
      await session.endSession();
      throw new AppError(500, "SSLCommerz error during order creation.");
    }
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const successOrder = async (tran_id: string): Promise<string> => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const order = await Order.findOne({ tranjectionId: tran_id }).session(
      session
    );
    if (!order) throw new AppError(404, "Order not found");

    // if (order.paidStatus) {
    //   return `http://localhost:3000/success/${tran_id}?status=already-paid`;
    // }

    const result = await Order.updateOne(
      { tranjectionId: tran_id },
      { $set: { paidStatus: true } },
      { session }
    );

    const user = await User.findById(order.userId).session(session);
    if (!user) throw new AppError(404, "User not found");

    const account = await Account.findOne({ userId: order.userId }).session(
      session
    );

    if (!account) {
      // Create a new account if it doesn't exist
      await Account.create(
        [
          {
            userId: order.userId,
            account_name: user.name,
            account_status: user.accountType,
            all_transaction_id: [order.tranjectionId],
            total_balance: order.amount,
          },
        ],
        { session }
      );
    } else {
      const transactionIds = account.all_transaction_id.includes(
        order.tranjectionId as any
      )
        ? account.all_transaction_id
        : [...account.all_transaction_id, order.tranjectionId];

      const updatedBalance = account.total_balance + order.amount;

      await Account.findOneAndUpdate(
        { userId: order.userId },
        {
          $set: {
            account_name: user.name,
            account_status: user.accountType,
            total_balance: updatedBalance,
            all_transaction_id: transactionIds,
          },
        },
        { session }
      );
    }

    if (result.modifiedCount > 0) {
      await session.commitTransaction();
      await session.endSession();
      return `http://localhost:3000/success/${tran_id}?status=paid`;
    } else {
      await session.abortTransaction();
      await session.endSession();
      throw new AppError(500, "Failed to update transaction.");
    }
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const failOrder = async (tran_id: string): Promise<string> => {
  const order = await Order.findOne({ tranjectionId: tran_id });

  if (!order) throw new AppError(404, "Order not found");

  // if (order.paidStatus) {
  //   return `http://localhost:3000/fail/${tran_id}?status=already-paid`;
  // }

  const result = await Order.deleteOne({ tranjectionId: tran_id });

  if (result.deletedCount > 0) {
    return `http://localhost:3000/fail/${tran_id}?status=failed`;
  } else {
    throw new AppError(500, "Failed to delete transaction.");
  }
};

export const orderService = {
  addAmount,
  successOrder,
  failOrder,
};
