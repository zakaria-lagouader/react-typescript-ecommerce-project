import { db } from "@/utils/db";
import { hashToken } from "@/utils/hash-token";

export function addRefreshTokenToWhitelist({
	tokenId,
	refreshToken,
	userId,
}: {
	tokenId: string;
	refreshToken: string;
	userId: string;
}) {
	return db.refreshToken.create({
		data: {
			id: tokenId,
			hashedToken: hashToken(refreshToken),
			userId,
		},
	});
}

export function findRefreshTokenById(id: string) {
	return db.refreshToken.findUnique({
		where: { id },
	});
}

export function deleteRefreshToken(id: string) {
	return db.refreshToken.update({
		where: { id },
		data: { revoked: true },
	});
}

export function revokeTokens(userId: string) {
	return db.refreshToken.updateMany({
		where: { userId },
		data: { revoked: true },
	});
}
