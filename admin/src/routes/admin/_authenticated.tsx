import { redirect } from "@tanstack/react-router";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_authenticated")({
	beforeLoad: async ({ context, location }) => {
		if (!context.authContext.user) {
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
