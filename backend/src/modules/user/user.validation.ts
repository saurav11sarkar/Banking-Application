import { z } from "zod";

const userSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email"),
  password: z.string({
    required_error: "Password is required",
  }),
  accountType: z
    .enum(["saving", "current"], {
      required_error: "Account type is required",
    })
    .optional(),
  balance: z.number().optional(),
});

export const userValidation = {
  userSchema,
};
