import { AuthProvider, useAuthContext } from "@/features/auth/components/auth-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProps, RouterProvider } from "@tanstack/react-router";

interface ProvidersProps {
	queryClient: QueryClient;
	router: RouterProps["router"];
}

export function GlobalProviders({ router, queryClient }: ProvidersProps) {
	const authContext = useAuthContext();
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<RouterProvider router={router} context={{ authContext }} />
			</AuthProvider>
		</QueryClientProvider>
	);
}
