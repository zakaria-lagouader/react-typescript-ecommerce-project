import bcrypt from "bcrypt";

export async function hashPassword(password: string, saltRounds?: number) {
	return bcrypt.hash(password, saltRounds || 10);
}

export async function comparePassword(plainTextPassword: string, userHashedPassword: string) {
	return await bcrypt.compare(plainTextPassword, userHashedPassword);
}
