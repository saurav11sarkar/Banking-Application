import { model, Schema } from "mongoose";
import { IAccount } from "./account.interface";

const accountSchema = new Schema<IAccount>({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  account_name: { type: String, required: true },
  account_status: { type: String, required: true },
  all_transaction_id: [String],
  total_balance: { type: Number, required: true },
});

const Account = model<IAccount>("Account", accountSchema);
export default Account;
