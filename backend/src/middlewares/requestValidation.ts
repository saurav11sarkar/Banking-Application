import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import catchAsync from "../utils/catchAsync";

const requestValidation = (schema: ZodSchema) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync(req.body);
    return next();
  });
};

export default requestValidation;
