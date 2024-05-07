import { z } from "zod";

export const ForgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required." })
        .email("This is not a valid email.")
});

export type ForgotPasswordModel = z.infer<typeof ForgotPasswordSchema>;
