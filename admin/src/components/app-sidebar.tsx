import * as React from "react";
import {
	AudioWaveform,
	Command,
	Files,
	GalleryVerticalEnd,
	House,
	LayoutGrid,
	Link as LinkIcon,
	Package,
	ShoppingCart,
	UserPen,
	Users,
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
			title: "Dashboard",
			url: "#",
			icon: House,
		},
		{
			title: "Products",
			url: "#",
			icon: Package,
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
			icon: ShoppingCart,
		},
		{
			title: "Customers",
			url: "#",
			icon: Users,
		},
	],
	blog: [
		{
			title: "Blog",
			url: "#",
			icon: Files,
		},
		{
			title: "Categories",
			url: "#",
			icon: LayoutGrid,
		},
		{
			title: "Authors",
			url: "#",
			icon: UserPen,
		},
		{
			title: "Links",
			url: "#",
			icon: LinkIcon,
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
