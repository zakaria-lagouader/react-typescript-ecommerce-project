import catchErrors from "@/utils/catch-errors";
import { loginSchema, registerSchema } from "@/schemas/auth.schema";
import { createAccount, loginUser } from "@/services/auth.service";
import { CREATED, OK } from "@/constants/http";
import { setAuthCookies } from "@/utils/cookies";

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
