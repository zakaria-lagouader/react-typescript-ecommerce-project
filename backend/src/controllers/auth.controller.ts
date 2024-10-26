import catchErrors from "@/utils/catch-errors";
import { registerSchema } from "@/schemas/auth.schema";
import { createAccount } from "@/services/auth.service";
import { CREATED } from "@/constants/http";
import { setAuthCookies } from "@/utils/cookies";

export const registerHandler = catchErrors(async (req, res) => {
	const request = registerSchema.parse(req.body);

	const { user, accessToken, refreshToken } = await createAccount(request);

	return setAuthCookies({ res, accessToken, refreshToken }).status(CREATED).json(user);
});
