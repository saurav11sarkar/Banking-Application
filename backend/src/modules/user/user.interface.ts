import { Types } from "mongoose";

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  accountType?: "saving" | "current";
  image?: string;
  address?: string;
  phone?: string;
}
