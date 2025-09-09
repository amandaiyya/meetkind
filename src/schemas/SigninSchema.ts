import {z} from 'zod';

export const SigninSchema = z.object({
    email: z.email({message: "Invalid email address"}),
    password: z.string(),
})