import { Router } from "express";
import { registerHandler } from "@/controllers/auth.controller";

export const authRoutes = Router();

// prefix: /auth
authRoutes.post("/register", registerHandler);
// authRoutes.post("/login", loginHandler);
// authRoutes.get("/refresh", refreshHandler);
// authRoutes.get("/logout", logoutHandler);