import { z } from "zod";

export const passwordValidation = (fieldName: string) =>
    z.string().superRefine((val, ctx) => {
        if (val === null || val === undefined || val.length === 0) {
            ctx.addIssue({ code: 'custom', message: `${fieldName} is required.` });
        } else if (val.length < 8) {
            ctx.addIssue({ code: 'custom', message: `${fieldName} should have a minimum length of 8 characters.` });
        }
    });

export const LoginSchema = z.object({
    username: z.string().min(1, "Username is required."),
    password: passwordValidation("Password"),
    rememberMe: z.boolean().default(false)
})

export type LoginForm = z.infer<typeof LoginSchema>;


