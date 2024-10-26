const getEnv = (key: string, defaultValue?: string): string => {
	const value = process.env[key] || defaultValue;

	if (value === undefined) {
		throw Error(`Missing String environment variable for ${key}`);
	}

	return value;
};

export const NODE_ENV = getEnv("NODE_ENV", "development");
export const PORT = getEnv("PORT", "4004");
export const ACCESS_TOKEN_SECRET = getEnv("ACCESS_TOKEN_SECRET");
export const REFRESH_TOKEN_SECRET = getEnv("REFRESH_TOKEN_SECRET");
export const ACCESS_TOKEN_EXPIRE = getEnv("ACCESS_TOKEN_EXPIRE");
export const REFRESH_TOKEN_EXPIRE = getEnv("REFRESH_TOKEN_EXPIRE");
