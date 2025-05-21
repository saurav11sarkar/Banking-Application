import mongoose from "mongoose";
import { IFixDeposit } from "./fixDeposit.interface";

const fixDepositSchema = new mongoose.Schema<IFixDeposit>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    apply_for: {
      type: String,
      trim: true,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    isClaimed: {
      type: Boolean,
      default: false,
    },
    interest_amount: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      required: true,
    },
    claimed_date: {
      type: Date,
    },
    total_amount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const FixDeposit = mongoose.model("FixDeposit", fixDepositSchema);
export default FixDeposit;
