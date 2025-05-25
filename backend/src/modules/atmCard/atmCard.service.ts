import AppError from "../../errors/appError";
import Account from "../account/account.model";
import User from "../user/user.model";
import AtmCard from "./atmCard.model";
import { IAtmCard } from "./atmCard.interface";

// Generate random 16-digit card number in 4 segments
const generateCardNumber = (): string => {
  const segments = Array(4)
    .fill(null)
    .map(() => String(Math.floor(1000 + Math.random() * 9000)));
  return segments.join("");
};

// Create a new ATM card
const addNewCard = async (payload: Partial<IAtmCard>, userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, "User not found");

  const account = await Account.findById(payload.account);
  if (!account) throw new AppError(404, "Account not found");

  const existingAtm = await AtmCard.findOne({ account: account._id });
  if (existingAtm) throw new AppError(400, "Account already has an ATM card");

  const cardNumber = generateCardNumber();
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 3);
  const cvv_no = Math.floor(Math.random() * 1000);

  const newCard = await AtmCard.create({
    ...payload,
    cardNumber,
    expiryDate,
    cvv: cvv_no,
    user: user._id,
    account: account._id,
  });

  return newCard;
};

// Get ATM card by user ID and populate limited user info
const getAtmCard = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, "User not found");

  const atmCard = await AtmCard.findOne({ user: user._id })
    .populate("user", "name email _id"); // ✅ Only these fields from `user`

  if (!atmCard) throw new AppError(404, "ATM card not found");

  return atmCard;
};

export const atmCardService = {
  addNewCard,
  getAtmCard,
};
