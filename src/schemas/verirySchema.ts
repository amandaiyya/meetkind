import {z} from "zod";

export const VerifySchema = z.object({
    email: z
        .email({message: "Invalid email address"}),
    
    verifyCode: z
        .array(z.string().trim().regex(/^\d$/, "Each field must be a single digit"))
        .length(6, "Verification code must be 6 digits")
        .refine(
            (arr) => arr.every((v) => v !== ""),
            { message: "Verification code must be 6 digits" }
        )
})