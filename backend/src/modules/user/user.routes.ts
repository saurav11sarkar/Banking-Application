import express from "express";
import { userController } from "./user.controller";
import requestValidation from "../../middlewares/requestValidation";
import { userValidation } from "./user.validation";
import { auth } from "../../middlewares/auth";
import { multerConfig } from "../../middlewares/multer";
const router = express.Router();

router.post(
  "/register",
  requestValidation(userValidation.userSchema),
  userController.register
);

router.get("/profile", auth, userController.profile);
router.patch("/updeted", multerConfig("image"), auth, userController.updateProfile);

export const userRoutes = router;
