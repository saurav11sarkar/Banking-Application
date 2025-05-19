import catchAsync from "../../utils/catchAsync";
import { orderService } from "./order.service";
import sendResponse from "../../utils/sendResponse";

export const orderController = {
  addAmount: catchAsync(async (req, res) => {
    const result = await orderService.addAmount(req.body, req.user?._id);
    // sendResponse(res, 201, "Amount added successfully", result);
    res.status(201).json({
      success: true,
      message: "Amount added successfully",
      data: result,
    });
  }),

  successOrder: catchAsync(async (req, res) => {
    console.log(`✅ [${req.method}] Hit successOrder route with tran_id:`, req.params.tran_id);
    const result = await orderService.successOrder(req.params.tran_id);
    return res.redirect(result);
  }),
  

  failOrder: catchAsync(async (req, res) => {
    const result = await orderService.failOrder(req.params.tran_id);
    return res.redirect(result);
  }),
};
