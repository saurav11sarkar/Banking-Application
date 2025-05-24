import express from "express";
import { auth } from "../../middlewares/auth";
import { atmCardController } from "./atmCard.controller";
const router = express.Router();

router.post("/add-new", auth, atmCardController.addNewCard);

export const atmCardRouter = router;
