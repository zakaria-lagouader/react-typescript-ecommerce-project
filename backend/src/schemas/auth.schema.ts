import { z } from "zod";

const emailSchema = z.string().email().min(1).max(255);

const passwordSchema = z.string().min(6).max(255);

export const loginSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
});

export const registerSchema = loginSchema
	.extend({
		password_confirmation: passwordSchema,
	})
	.refine((data) => data.password === data.password_confirmation, {
		message: "Passwords do not match",
		path: ["password_confirmation"],
	});
