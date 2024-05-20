import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, "username is required")
    .max(20, "Username must not exceed 20 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password must not exceed 100 characters")
    .regex(/[a-z]/, "Password must include at least one lowercase letter")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/[0-9]/, "Password must include at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must include at least one special character"
    ),
});

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "username is required")
    .max(20, "Username must not exceed 20 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password must not exceed 100 characters")
    .regex(/[a-z]/, "Password must include at least one lowercase letter")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/[0-9]/, "Password must include at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must include at least one special character"
    ),
});
