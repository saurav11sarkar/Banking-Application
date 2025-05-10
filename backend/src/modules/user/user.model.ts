import mongoose from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from "bcryptjs";
import config from "../../config";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    accountType: {
      type: String,
      enum: ["saving", "current"],
      default: "saving",
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.ROUNDS));
  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
