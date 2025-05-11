// middlewares/auth.ts
import { NextFunction, Request, Response } from "express";
import AppError from "../errors/appError";
import jwt, { JwtPayload } from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers?.authorization || "";
    const token = header.startsWith("Bearer ") ? header.split(" ")[1] : req.cookies?.token;

    if (!token) {
      throw new AppError(401, "You are not logged in! Please login to get access");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    if (!decoded || typeof decoded !== "object" || !decoded.id) {
      throw new AppError(401, "Invalid token payload");
    }

    req.user = { _id: decoded.id }; // Attach user ID to req.user
    next();
  } catch (error) {
    next(error);
  }
};
