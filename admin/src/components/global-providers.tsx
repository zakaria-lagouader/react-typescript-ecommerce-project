import { AuthProvider, useAuthState } from "@/features/auth/components/auth-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProps, RouterProvider } from "@tanstack/react-router";

interface ProvidersProps {
	queryClient: QueryClient;
	router: RouterProps["router"];
}

function RouterProviderWithAuthContext({ router }: { router: RouterProps["router"] }) {
	const authContext = useAuthState();
	return <RouterProvider router={router} context={{ authContext }} />;
}

export function GlobalProviders({ router, queryClient }: ProvidersProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<RouterProviderWithAuthContext router={router} />
			</AuthProvider>
		</QueryClientProvider>
	);
}
