import express from "express";
import { auth } from "../../middlewares/auth";
import { AccountController } from "./aacount.controller";

const router = express.Router();

router.get("/", auth, AccountController.getAccount);
router.get("/all-orders", auth, AccountController.allOrdersTransaction);
export const accountRoutes = router;
