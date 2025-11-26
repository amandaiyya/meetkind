import {z} from "zod";

export const ResetPasswordSchema = z.object({
    id: z
        .string()
        .regex(/^[a-fA-F0-9]{24}$/, "Invalid id format"),

    token: z
        .string()
        .length(64, "Invalid token length")
        .regex(/^[a-fA-F0-9]{64}$/, "Invalid token format"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
})