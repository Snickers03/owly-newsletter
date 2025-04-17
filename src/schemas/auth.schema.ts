import { z } from "zod";

import { emailField, minPassword, requiredString } from "./validators";

export const loginSchema = z.object({
  email: emailField,
  password: requiredString(),
});

export const signUpSchema = z
  .object({
    name: requiredString(),
    email: emailField,
    password: minPassword,
    confirmPassword: minPassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "* Passwords do not match",
    path: ["confirmPassword"],
  });

export const verifyEmailSchema = z.object({
  token: z
    .string()
    .min(1, {
      message: "*",
    })
    .regex(/^\d{6}$/, { message: "* Invalid code" }),
});

export const enterEmailSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "* Email is required",
    })
    .email({
      message: "* Invalid email address",
    }),
});

export const enterTokenSchema = z.object({
  token: z
    .string()
    .min(1, {
      message: "* Code is required",
    })
    .regex(/^\d{6}$/, { message: "* Invalid code" }),
});

export const enterNewPasswordSchema = z
  .object({
    password: minPassword,
    confirmPassword: minPassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "* Passwords do not match",
    path: ["confirmPassword"],
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const updateNameSchema = z.object({
  name: requiredString(),
});
