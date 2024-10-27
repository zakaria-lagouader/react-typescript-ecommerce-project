import { AppErrorCode } from "@/constants/app-error-code";
import { UNAUTHORIZED } from "@/constants/http";
import appAssert from "@/utils/app-assert";
import { verifyToken } from "@/utils/jwt";
import { type RequestHandler } from "express";

export const authenticate: RequestHandler = (req, res, next) => {
	const accessToken = req.cookies.accessToken as string | undefined;
	appAssert(accessToken, UNAUTHORIZED, "Not authorized", AppErrorCode.InvalidAccessToken);

	const { error, payload } = verifyToken(accessToken);

	appAssert(
		payload,
		UNAUTHORIZED,
		error === "jwt expired" ? "Token expired" : "Invalid token",
		AppErrorCode.InvalidAccessToken
	);

	// @ts-ignore
	req.userId = payload.userId;
	next();
};
