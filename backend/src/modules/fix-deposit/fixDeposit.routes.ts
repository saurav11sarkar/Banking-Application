import express from "express";
import { auth } from "../../middlewares/auth";
import { fixDepositController } from "./fixDeposit.controller";

const router = express.Router();

router.post("/create", auth, fixDepositController.createFixDeposit);

export const fixDepositRoutes = router;
