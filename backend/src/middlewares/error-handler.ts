import { z } from "zod";
import { AppError } from "@/utils/app-error";
import { Response, ErrorRequestHandler } from "express";
import { clearAuthCookies, REFRESH_PATH } from "@/utils/cookies";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "@/constants/http";

const handleZodError = (res: Response, error: z.ZodError) => {
	const errors = error.issues.map((err) => ({
		path: err.path.join("."),
		message: err.message,
	}));

	return res.status(BAD_REQUEST).json({
		errors,
		message: error.message,
	});
};

const handleAppError = (res: Response, error: AppError) => {
	return res.status(error.statusCode).json({
		message: error.message,
		errorCode: error.errorCode,
	});
};

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
	console.log(`PATH ${req.path}`, error);

	if (req.path === REFRESH_PATH) {
		clearAuthCookies(res);
	}

	if (error instanceof z.ZodError) {
		handleZodError(res, error);
	}

	if (error instanceof AppError) {
		handleAppError(res, error);
	}

	res.status(INTERNAL_SERVER_ERROR).send("Internal server error");
};
