import express from "express";
import { userController } from "./user.controller";
import requestValidation from "../../middlewares/requestValidation";
import { userValidation } from "./user.validation";
const router = express.Router();

router.post(
  "/register",
  requestValidation(userValidation.userSchema),
  userController.register
);

export const userRoutes = router;
