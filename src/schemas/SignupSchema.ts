import {z} from 'zod';

export const SignupSchema = z.object({
    username: z
        .string()
        .min(2, "Username must be at least 2 characters")
        .max(20, "Username must be no more than 20 characters")
        .regex(/^[A-Za-z0-9]+$/, "Username must not contain special character and spaces between"),

    email: z
        .email({message: "Invalid email address"}),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
});