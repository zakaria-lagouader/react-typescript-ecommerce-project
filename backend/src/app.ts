import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import { PORT } from "@/constants/env";
import cookieParser from "cookie-parser";
import { authRoutes } from "@/routes/auth.route";
import { errorHandler } from "@/middlewares/error-handler";
import { authenticate } from "@/middlewares/authenticate";
import { userRoutes } from "@/routes/user.route";

export const app = express();

// Middlewares
app.use(morgan("dev")); // Logger
app.use(helmet()); // Security
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// health check
app.get("/", (_, res) => {
	res.status(200).json({
		status: "healthy",
	});
});

// auth routes
app.use("/auth", authRoutes);

// protected routes
app.use("/user", authenticate, userRoutes);

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
