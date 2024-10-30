import axios from "axios";

const options = {
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
};

export const api = axios.create(options);

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const { config, response } = error;
		const { status, data } = response || {};

		// try to refresh the access token behind the scenes
		// if (status === UNAUTHORIZED && data?.errorCode === "InvalidAccessToken") {
		// 	try {
		// 		// refresh the access token, then retry the original request
		// 		await TokenRefreshClient.get("/auth/refresh");
		// 		return TokenRefreshClient(config);
		// 	} catch (error) {
		// 		// handle refresh errors by clearing the query cache & redirecting to login
		// 		queryClient.clear();
		// 		navigate("/login", {
		// 			state: {
		// 				redirectUrl: window.location.pathname,
		// 			},
		// 		});
		// 	}
		// }

		return Promise.reject({ status, ...data });
	}
);
