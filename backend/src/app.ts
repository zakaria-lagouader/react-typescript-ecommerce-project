import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import { ADMIN_CLIENT_URL, PORT } from "@/constants/env";
import cookieParser from "cookie-parser";
import { authRoutes } from "@/routes/auth.route";
import { errorHandler } from "@/middlewares/error-handler";
import { authenticate } from "@/middlewares/authenticate";
import { userRoutes } from "@/routes/user.route";
import { categoryRoutes } from "@/routes/category.route";
import { brandRoutes } from "@/routes/brand.route";

export const app = express();

// Middlewares
app.use(morgan("dev")); // Logger
app.use(helmet()); // Security
app.use(
	cors({
		origin: ADMIN_CLIENT_URL,
		credentials: true,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

// health check
app.get("/", (_, res) => {
	res.json({ message: "Server is running" });
});

// auth routes
app.use("/auth", authRoutes);

// protected routes
app.use("/user", authenticate, userRoutes);
app.use("/categories", authenticate, categoryRoutes);
app.use("/brands", authenticate, brandRoutes);

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
