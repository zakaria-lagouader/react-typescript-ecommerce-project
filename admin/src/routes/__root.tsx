import { AlertDialogProvider } from "@/components/alert-dialog-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthContext } from "@/features/auth/components/auth-provider";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

interface RouteContext {
	queryClient: QueryClient;
	authContext: AuthContext;
}

export const Route = createRootRouteWithContext<RouteContext>()({
	component: () => (
		<ThemeProvider>
			<AlertDialogProvider>
				<Outlet />
			</AlertDialogProvider>
		</ThemeProvider>
	),
});
