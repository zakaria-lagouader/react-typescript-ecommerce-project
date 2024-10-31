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

import { NavGroup, NavGroupProps } from "@/components/nav-group";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";

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
};

const shopRoutes: NavGroupProps["items"] = [
	{
		title: "Dashboard",
		url: "/admin",
		icon: House,
	},
	{
		title: "Products",
		url: "/admin/products",
		icon: Package,
		items: [
			{
				title: "Products List",
				url: "/admin/products",
			},
			{
				title: "Categories",
				url: "/admin/products/categories",
			},
			{
				title: "Brands",
				url: "/admin/products",
			},
		],
	},
	{
		title: "Orders",
		url: "/admin",
		icon: ShoppingCart,
	},
	{
		title: "Customers",
		url: "/admin",
		icon: Users,
	},
];
const blogRoutes: NavGroupProps["items"] = [
	{
		title: "Blog",
		url: "/admin",
		icon: Files,
	},
	{
		title: "Categories",
		url: "/admin",
		icon: LayoutGrid,
	},
	{
		title: "Authors",
		url: "/admin",
		icon: UserPen,
	},
	{
		title: "Links",
		url: "/admin",
		icon: LinkIcon,
	},
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavGroup items={shopRoutes} label="Shop" />
				<NavGroup items={blogRoutes} label="Blog" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
