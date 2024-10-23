declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production";
			JWT_ACCESS_SECRET: string;
			JWT_REFRESH_SECRET: string;
		}
	}
}

export {};
