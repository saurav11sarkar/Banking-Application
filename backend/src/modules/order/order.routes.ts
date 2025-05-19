import express from "express";

import { auth } from "../../middlewares/auth";
import { orderController } from "./order.controller";
const router = express.Router();

router.post("/addAmount", auth, orderController.addAmount);
router.route("/success/:tran_id")
  .get(orderController.successOrder)
  .post(orderController.successOrder); // Add this

router.route("/fail/:tran_id")
  .get(orderController.failOrder)
  .post(orderController.failOrder); // Add this


export const orderRouter = router;
