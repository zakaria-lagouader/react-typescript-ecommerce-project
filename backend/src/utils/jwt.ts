import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export function generateAccessToken(user: User) {
	return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET, {
		expiresIn: "5m",
	});
}

export function generateRefreshToken(user: User, tokenId: string) {
	return jwt.sign({ userId: user.id, jti: tokenId }, process.env.JWT_REFRESH_SECRET, {
		expiresIn: "30d",
	});
}

export function generateTokens(user: User, tokenId: string) {
	const accessToken = generateAccessToken(user);
	const refreshToken = generateRefreshToken(user, tokenId);

	return {
		accessToken,
		refreshToken,
	};
}
