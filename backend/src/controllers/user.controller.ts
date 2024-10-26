import { NOT_FOUND, OK } from "@/constants/http";
import appAssert from "@/utils/app-assert";
import catchErrors from "@/utils/catch-errors";
import { db } from "@/utils/db";

export const getUserHandler = catchErrors(async (req, res) => {
	const user = await db.user.findUnique({
		where: { id: req.userId },
		select: { id: true, email: true },
	});
	appAssert(user, NOT_FOUND, "User not found");
	return res.status(OK).json(user);
});
