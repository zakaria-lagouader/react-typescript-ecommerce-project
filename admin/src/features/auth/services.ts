import { TLoginSchema } from "@/features/auth/schemas/loginSchema";
import { TRegisterSchema } from "@/features/auth/schemas/registerSchema";
import { User } from "@/features/auth/types";
import { api } from "@/lib/api";

export function isAuthenticated() {
	return localStorage.getItem("isAuthenticated") === "true";
}

export function login({ email, password }: TLoginSchema) {
	if (email !== "admin@admin.com" || password !== "12345678") return false;
	localStorage.setItem("isAuthenticated", "true");
	return true;
}
export function register({ password, password_confirmation }: TRegisterSchema) {
	if (password !== password_confirmation) return false;
	localStorage.setItem("isAuthenticated", "true");
	return true;
}

export const getUser = async () => api.get<User>("/user");
