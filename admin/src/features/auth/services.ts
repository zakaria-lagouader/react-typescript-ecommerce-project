import { TLoginSchema } from "@/features/auth/schemas/loginSchema";
import { TRegisterSchema } from "@/features/auth/schemas/registerSchema";
import { User } from "@/features/auth/types";
import { api } from "@/lib/api";

export const getUser = async () => api.get("/user") as Promise<User>;
export const login = async (data: TLoginSchema) =>
	api.post("/auth/login", data) as Promise<{ message: string }>;
export const register = async (data: TRegisterSchema) =>
	api.post("/auth/register", data) as Promise<{ message: string }>;
export const logout = async () => api.get("/logout") as Promise<{ message: string }>;
