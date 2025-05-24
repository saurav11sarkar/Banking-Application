import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { atmCardService } from "./atmCard.service";

const addNewCard = catchAsync(async (req, res) => {
  const result = await atmCardService.addNewCard(req.body, req.user?._id);
  sendResponse(res, 201, "Card Added Successfully", result);
});

export const atmCardController = {
  addNewCard,
};
