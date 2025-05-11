import express from "express";
import { userController } from "./user.controller";
import requestValidation from "../../middlewares/requestValidation";
import { userValidation } from "./user.validation";
import { auth } from "../../middlewares/auth";
const router = express.Router();

router.post(
  "/register",
  requestValidation(userValidation.userSchema),
  userController.register
);

router.get("/profile", auth, userController.profile);

export const userRoutes = router;
