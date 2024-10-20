import Dashboard from "@/components/dashboard-07";
import { TooltipProvider } from "@/components/ui/tooltip";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/products/create")({
	component: () => (
		<TooltipProvider>
			<Dashboard />
		</TooltipProvider>
	),
});
