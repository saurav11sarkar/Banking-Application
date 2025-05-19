import { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema<IOrder>({
  amount: { type: Number, required: true },
  currency: { type: String, default: "BDT" },
  paidStatus: { type: Boolean, default: false },
  tranjectionId: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Order = model<IOrder>("Order", orderSchema);
export default Order;
