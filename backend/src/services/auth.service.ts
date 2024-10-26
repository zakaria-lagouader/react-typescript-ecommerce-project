import { CONFLICT } from "@/constants/http";
import appAssert from "@/utils/app-assert";
import { db } from "@/utils/db";
import { generateTokens } from "@/utils/jwt";
import { hashPassword } from "@/utils/password";

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
