import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8, "Password should be 8 charachters minimum"),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
