import * as React from "react";
import {
	AudioWaveform,
	BookOpen,
	Bot,
	Command,
	Frame,
	GalleryVerticalEnd,
	Map,
	PieChart,
	SquareTerminal,
} from "lucide-react";

import { NavGroup } from "@/components/nav-group";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	teams: [
		{
			name: "Acme Inc",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
		{
			name: "Acme Corp.",
			logo: AudioWaveform,
			plan: "Startup",
		},
		{
			name: "Evil Corp.",
			logo: Command,
			plan: "Free",
		},
	],
	shop: [
		{
			title: "Products",
			url: "#",
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: "Products List",
					url: "#",
				},
				{
					title: "Categories",
					url: "#",
				},
				{
					title: "Brands",
					url: "#",
				},
			],
		},
		{
			title: "Orders",
			url: "#",
			icon: Bot,
		},
		{
			title: "Customers",
			url: "#",
			icon: BookOpen,
		},
	],
	blog: [
		{
			title: "Blog",
			url: "#",
			icon: Frame,
		},
		{
			title: "Categories",
			url: "#",
			icon: PieChart,
		},
		{
			title: "Authors",
			url: "#",
			icon: Map,
		},
		{
			title: "Links",
			url: "#",
			icon: Map,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavGroup items={data.shop} label="Shop" />
				<NavGroup items={data.blog} label="Blog" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
