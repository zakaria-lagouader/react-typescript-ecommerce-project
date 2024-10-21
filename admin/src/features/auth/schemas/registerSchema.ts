import { z } from "zod";

export const registerSchema = z
	.object({
		name: z.string().min(3, "Name should be 3 charachters minimum"),
		email: z.string().email(),
		password: z.string().min(8, "Password should be 8 charachters minimum"),
		password_confirmation: z.string(),
	})
	.refine((data) => data.password === data.password_confirmation, {
		message: "Password confirmation should be the same",
		path: ["password_confirmation"],
	});

export type TRegisterSchema = z.infer<typeof registerSchema>;
