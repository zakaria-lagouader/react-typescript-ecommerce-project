import { AuthLayout } from "@/features/auth/components/auth-layout";
import { redirect } from "@tanstack/react-router";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_guest")({
	beforeLoad: async ({ context }) => {
		if (context.authContext.user) {
			throw redirect({
				to: "/admin",
			});
		}
	},
	component: () => (
		<AuthLayout>
			<Outlet />
		</AuthLayout>
	),
});
