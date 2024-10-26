import { REFRESH_TOKEN_SECRET } from "@/constants/env";
import { CONFLICT, UNAUTHORIZED } from "@/constants/http";
import appAssert from "@/utils/app-assert";
import { db } from "@/utils/db";
import { generateTokens, verifyToken } from "@/utils/jwt";
import { comparePassword, hashPassword } from "@/utils/password";

type CreateAccountParams = {
	email: string;
	password: string;
};

export async function createAccount(data: CreateAccountParams) {
	// verify email is not taken
	const existingUser = await db.user.findUnique({
		where: { email: data.email },
		select: { id: true },
	});

	appAssert(!existingUser, CONFLICT, "Email already in use");

	const user = await db.user.create({
		data: {
			email: data.email,
			password: await hashPassword(data.password),
		},
	});

	const { accessToken, refreshToken } = generateTokens({ userId: user.id });

	// save refresh token to db
	const updatedUser = await db.user.update({
		where: { id: user.id },
		data: { refreshToken },
		select: { id: true, email: true },
	});

	return { accessToken, refreshToken, user: updatedUser };
}

type LoginUserParams = {
	email: string;
	password: string;
};

export async function loginUser(data: LoginUserParams) {
	const user = await db.user.findUnique({
		where: { email: data.email },
		select: { id: true, password: true },
	});

	appAssert(user, UNAUTHORIZED, "Invalid email or password");

	const passwordMatch = await comparePassword(data.password, user.password);

	appAssert(passwordMatch, CONFLICT, "Invalid email or password");

	const { accessToken, refreshToken } = generateTokens({ userId: user.id });

	// save refresh token to db
	const updatedUser = await db.user.update({
		where: { id: user.id },
		data: { refreshToken },
		select: { id: true, email: true },
	});

	return { accessToken, refreshToken, user: updatedUser };
}

export async function refreshUserAccessToken(refreshToken: string) {
	const { payload } = verifyToken(refreshToken, REFRESH_TOKEN_SECRET);

	appAssert(payload, UNAUTHORIZED, "Invalid refresh token");

	const user = await db.user.findUnique({
		where: { id: payload.userId },
		select: { id: true, refreshToken: true },
	});

	appAssert(user && user.refreshToken === refreshToken, UNAUTHORIZED, "Invalid refresh token");

	const { accessToken, refreshToken: newRefreshToken } = generateTokens({ userId: user.id });

	await db.user.update({
		where: { id: user.id },
		data: { refreshToken: newRefreshToken },
	});

	return {
		accessToken,
		newRefreshToken,
	};
}
