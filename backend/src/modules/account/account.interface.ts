import { Types } from "mongoose";

export interface IAccount {
  userId: Types.ObjectId;
  account_name: string;
  account_status: string;
  all_transaction_id: string[];
  total_balance: number;
}
