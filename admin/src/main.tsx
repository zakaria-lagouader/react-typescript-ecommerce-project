import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { GlobalProviders } from "@/components/global-providers";
import "./index.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new query client instance
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
		},
	},
});

// Create a new router instance
const router = createRouter({
	routeTree,
	context: { queryClient, authContext: undefined! },
	defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<GlobalProviders router={router} queryClient={queryClient} />
	</StrictMode>
);
