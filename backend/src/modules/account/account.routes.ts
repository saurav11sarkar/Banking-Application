import express from "express";
import { auth } from "../../middlewares/auth";
import { AccountController } from "./aacount.controller";

const router = express.Router();

router.get("/", auth, AccountController.getAccount);
router.get("/all-orders", auth, AccountController.allOrdersTransaction);
router.get("/account-number", auth, AccountController.getAccountNumber);
export const accountRoutes = router;
