import { TLoginSchema } from "@/features/auth/schemas/loginSchema";
import { TRegisterSchema } from "@/features/auth/schemas/registerSchema";
import { User } from "@/features/auth/types";
import { api } from "@/lib/api";

export const getUser = async () => api.get<User>("/user");
export const login = async (data: TLoginSchema) =>
	api.post<{ message: string }>("/auth/login", data);
export const logout = async () => api.get("/logout");
export const register = async (data: TRegisterSchema) => api.post("/register", data);
