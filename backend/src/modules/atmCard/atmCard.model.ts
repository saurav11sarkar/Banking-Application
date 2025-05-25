import mongoose from "mongoose";
import { IAtmCard } from "./atmCard.interface";

const atmCardSchema = new mongoose.Schema<IAtmCard>(
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
    cardNumber: {
      type: String,
      required: true,
      unique: true,
    },
    pin: {
      type: Number,
      required: true,
    },
    cvv: {
      type: Number,
      required: true,
    },
    cardType: {
      type: String,
      enum: ["basic", "classic", "platinum"],
      default: "basic",
    },
    expiryDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const AtmCard = mongoose.model<IAtmCard>("AtmCard", atmCardSchema);
export default AtmCard;
