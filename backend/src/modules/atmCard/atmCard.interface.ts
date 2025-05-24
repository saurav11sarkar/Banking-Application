import { Types } from "mongoose";

export interface IAtmCard {
  user: Types.ObjectId;
  account: Types.ObjectId;
  data?: Date;
  cardNumber: Number;
  cvv: Number;
  pin: Number;
  cardType: "basic" | "classic" | "platinum";
  expiryDate: Date;
}
