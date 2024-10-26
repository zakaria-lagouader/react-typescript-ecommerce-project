import {
	ACCESS_TOKEN_EXPIRE,
	ACCESS_TOKEN_SECRET,
	REFRESH_TOKEN_EXPIRE,
	REFRESH_TOKEN_SECRET,
} from "@/constants/env";
import jwt from "jsonwebtoken";

export type JWTPayload = {
	userId: string;
};

export function generateTokens(payload: JWTPayload) {
	const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
		expiresIn: ACCESS_TOKEN_EXPIRE,
	});

	const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
		expiresIn: REFRESH_TOKEN_EXPIRE,
	});

	return { accessToken, refreshToken };
}

export function verifyToken(token: string, secret: string = ACCESS_TOKEN_SECRET) {
	try {
		const payload = jwt.verify(token, secret) as JWTPayload;
		return { payload };
	} catch (error: any) {
		return { error: error.message };
	}
}
