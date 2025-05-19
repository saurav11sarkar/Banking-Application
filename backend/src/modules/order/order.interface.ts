import { Types } from "mongoose";

export interface IOrder {
    amount: number;
    currency: string;
    paidStatus: boolean;
    tranjectionId: string;
    userId: Types.ObjectId;
  }