import catchErrors from "@/utils/catch-errors";
import { loginSchema, registerSchema } from "@/schemas/auth.schema";
import { createAccount, loginUser, refreshUserAccessToken } from "@/services/auth.service";
import { CREATED, OK, UNAUTHORIZED } from "@/constants/http";
import {
	AccessTokenCookieOptions,
	clearAuthCookies,
	RefreshTokenCookieOptions,
	setAuthCookies,
} from "@/utils/cookies";
import appAssert from "@/utils/app-assert";
import { verifyToken } from "@/utils/jwt";
import { db } from "@/utils/db";

export const registerHandler = catchErrors(async (req, res) => {
	const request = registerSchema.parse(req.body);

	const { user, accessToken, refreshToken } = await createAccount(request);

	return setAuthCookies({ res, accessToken, refreshToken }).status(CREATED).json(user);
});

export const loginHandler = catchErrors(async (req, res) => {
	const request = loginSchema.parse(req.body);

	const { accessToken, refreshToken } = await loginUser(request);

	// set cookies
	return setAuthCookies({ res, accessToken, refreshToken })
		.status(OK)
		.json({ message: "Login successful" });
});

export const refreshHandler = catchErrors(async (req, res) => {
	const refreshToken = req.cookies.refreshToken as string | undefined;
	appAssert(refreshToken, UNAUTHORIZED, "Missing refresh token");

	const { accessToken, newRefreshToken } = await refreshUserAccessToken(refreshToken);
	if (newRefreshToken) {
		res.cookie("refreshToken", newRefreshToken, RefreshTokenCookieOptions);
	}
	return res
		.status(OK)
		.cookie("accessToken", accessToken, AccessTokenCookieOptions)
		.json({ message: "Access token refreshed" });
});

export const logoutHandler = catchErrors(async (req, res) => {
	const accessToken = req.cookies.accessToken as string | undefined;
	const { payload } = verifyToken(accessToken || "");

	if (payload) {
		await db.user.update({
			where: { id: payload.userId },
			data: { refreshToken: null },
		});
	}

	// clear cookies
	return clearAuthCookies(res).status(OK).json({ message: "Logout successful" });
});
