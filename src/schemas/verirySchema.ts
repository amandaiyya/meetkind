import {z} from "zod";

export const VerifySchema = z.object({
    email: z
        .email({message: "Invalid email address"}),
    
    verifyCode: z
        .string()
        .length(6, "Verification code must be 6 digits")
})