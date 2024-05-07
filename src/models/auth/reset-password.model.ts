import { z } from "zod";
import {passwordValidation} from "@/models/auth/login.model.ts";
export const ResetPasswordSchema = z.object({
    password: passwordValidation('Password'),
    confirmPassword: passwordValidation('Confirm Password'),
    token: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
});

export type ResetPasswordModel = z.infer<typeof ResetPasswordSchema>;
