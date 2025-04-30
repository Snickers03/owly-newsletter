import { z } from "zod";

// A required string field with a default error message
export const requiredString = (message: string = "*") =>
  z.string().min(1, { message });

// An optional string field that allows either a valid string or an empty string
export const optionalString = (message?: string) =>
  z.union([requiredString(message || "*"), z.literal("")]).optional();

// Email field with basic validation and a localized error message
export const emailField = z
  .string()
  .min(1, { message: "*" })
  .email({ message: "* Invalid email address" });

// Password field that must be at least 8 characters long
export const minPassword = z.string().min(8, {
  message: "* At least 8 characters long",
});

// Token schema that checks for a 6-digit numeric code
export const tokenSchema = (minMessage: string, invalidMessage: string) =>
  z
    .string()
    .min(1, { message: minMessage })
    .regex(/^\d{6}$/, {
      message: invalidMessage,
    });
