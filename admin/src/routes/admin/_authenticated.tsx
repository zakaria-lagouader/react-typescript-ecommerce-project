import { isAuthenticated } from "@/features/auth/services";
import { redirect } from "@tanstack/react-router";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_authenticated")({
	beforeLoad: async ({ location }) => {
		if (!isAuthenticated()) {
			throw redirect({
				to: "/admin/login",
				search: {
					redirectTo: location.href,
				},
			});
		}
	},
	component: () => <Outlet />,
});
