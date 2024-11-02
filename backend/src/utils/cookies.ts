import { NODE_ENV } from "@/constants/env";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "@/utils/date";
import { CookieOptions, Response } from "express";

export const REFRESH_PATH = "/auth/refresh";

const defaults: CookieOptions = {
	httpOnly: true,
	secure: NODE_ENV === "production",
	sameSite: "strict",
};

export const AccessTokenCookieOptions = {
	...defaults,
	expires: thirtyDaysFromNow(), //TODO: change to 15 minutes
};

export const RefreshTokenCookieOptions = {
	...defaults,
	expires: thirtyDaysFromNow(),
	path: REFRESH_PATH,
};

type Params = {
	res: Response;
	accessToken: string;
	refreshToken: string;
};
export const setAuthCookies = ({ res, accessToken, refreshToken }: Params) =>
	res
		.cookie("accessToken", accessToken, AccessTokenCookieOptions)
		.cookie("refreshToken", refreshToken, RefreshTokenCookieOptions);

export const clearAuthCookies = (res: Response) =>
	res.clearCookie("accessToken").clearCookie("refreshToken", { path: REFRESH_PATH });
