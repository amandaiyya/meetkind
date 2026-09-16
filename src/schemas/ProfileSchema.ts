import { z } from "zod";

export const ProfileSchema = z.object({
    username: z
        .string(),

    email: z
        .email({message: "Invalid email address"}),
});