import express from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { orderRouter } from "../modules/order/order.routes";
import { accountRoutes } from "../modules/account/account.routes";
import { fixDepositRoutes } from "../modules/fix-deposit/fixDeposit.routes";
import { atmCardRouter } from "../modules/atmCard/atmCard.routes";
const router = express.Router();

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/order", orderRouter);
router.use("/account", accountRoutes);
router.use("/fix-deposit", fixDepositRoutes);
router.use("/atm", atmCardRouter);

export default router;
