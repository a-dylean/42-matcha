import { z } from "zod";

export const userCreationSchema = z
  .object({
    firstName: z
      .string({
        required_error: "First name is required",
      })
      .trim()
      .min(1, "First name must be at least 1 characters"),
    lastName: z
      .string({
        required_error: "Last name is required",
      })
      .trim()
      .min(1, "Last name must be at least 1 characters"),
    username: z
      .string({
        required_error: "Username is required",
      })
      .trim()
      .regex(
        /^[a-zA-Z0-9_]*$/,
        "Username can only contain letters, numbers, and underscores")
      .min(3, "Username must be at least 3 characters"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .trim()
      .email("Invalid email format"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .trim()
      .min(8, "Password must be at least 8 characters")
      .max(32),
  })
  .strict();

export const userLoginSchema = z
  .object({
    username: z
      .string({
        required_error: "Username is required",
      })
      .trim()
      .min(3, "Username must be at least 3 characters"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .trim()
      .min(8, "Password must be at least 8 characters")
      .max(32),
  })
  .strict();

export const userUpdateSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, "First name must be at least 1 characters"),
    lastName: z
      .string()
      .trim()
      .min(1, "Last name must be at least 1 characters"),
    username: z
      .string()
      .trim()
      .regex(
        /^[a-zA-Z0-9_]*$/,
        "Username can only contain letters, numbers, and underscores")
      .min(3, "Username must be at least 3 characters"),
    email: z.string().trim().email("Invalid email format"),
    gender: z.enum(["male", "female", "other"]),
    preferences: z.enum(["heterosexual", "homosexual", "bisexual"]),
    dateOfBirth: z.date(),
    bio: z.string().max(500, "Bio must be at most 500 characters"),
    // TODO: set up proper validation for location, min/max don't work with this setup
    location: z
      .object({
        latitude: z
          .number()
          .min(-90, "Latitude must be between -90 and 90")
          .max(90, "Latitude must be between -90 and 90"),
        longitude: z
          .number()
          .min(-180, "Longitude must be between -180 and 180")
          .max(180, "Longitude must be between -180 and 180"),
      })
      .transform((val) => `POINT(${val.longitude} ${val.latitude})`),
    lastSeen: z.date(),
    created: z.date(),
    updated: z.date(),
  })
  .partial();