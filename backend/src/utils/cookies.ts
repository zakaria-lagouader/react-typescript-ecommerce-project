import { fifteenMinutesFromNow, thirtyDaysFromNow } from "@/utils/date";
import { CookieOptions, Response } from "express";

export const REFRESH_PATH = "/auth/refresh";

const defaults: CookieOptions = {
	sameSite: "strict",
	httpOnly: true,
	secure: true,
};

const AccessTokenCookieOptions = {
	...defaults,
	expires: fifteenMinutesFromNow(),
};

const RefreshTokenCookieOptions = {
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