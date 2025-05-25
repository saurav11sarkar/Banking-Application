import { Types } from "mongoose";

export interface IAtmCard {
  user: Types.ObjectId;
  account: Types.ObjectId;
  cardNumber: string;
  cvv: number;
  pin: number;
  cardType: "basic" | "classic" | "platinum";
  expiryDate: Date;
  createdAt?: Date;
}
