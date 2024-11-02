import { ChevronRight, type LucideIcon } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { ValidRoutes } from "@/lib/types";

export interface NavGroupProps {
	items: {
		title: string;
		url: ValidRoutes;
		icon?: LucideIcon;
		items?: {
			title: string;
			url: ValidRoutes;
		}[];
	}[];
	label: string;
}

export function NavGroup({ items, label }: NavGroupProps) {
	const matchRoute = useMatchRoute();
	return (
		<SidebarGroup>
			<SidebarGroupLabel>{label}</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) =>
					item.items === undefined ? (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								tooltip={item.title}
								isActive={
									matchRoute({
										to: item.url,
									}) !== false
								}
								asChild
							>
								<Link to={item.url}>
									{item.icon && <item.icon />}
									<span>{item.title}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					) : (
						<Collapsible
							key={item.title}
							asChild
							className="group/collapsible"
							defaultOpen={item.items.some(
								(subItem) =>
									matchRoute({
										to: subItem.url,
										fuzzy: true,
									}) !== false
							)}
						>
							<SidebarMenuItem>
								<CollapsibleTrigger asChild>
									<SidebarMenuButton tooltip={item.title}>
										{item.icon && <item.icon />}
										<span>{item.title}</span>
										<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
									</SidebarMenuButton>
								</CollapsibleTrigger>
								<CollapsibleContent>
									<SidebarMenuSub>
										{item.items?.map((subItem) => (
											<SidebarMenuSubItem key={subItem.title}>
												<SidebarMenuSubButton
													isActive={
														matchRoute({
															to: subItem.url,
														}) !== false
													}
													asChild
												>
													<Link to={subItem.url}>
														<span>{subItem.title}</span>
													</Link>
												</SidebarMenuSubButton>
											</SidebarMenuSubItem>
										))}
									</SidebarMenuSub>
								</CollapsibleContent>
							</SidebarMenuItem>
						</Collapsible>
					)
				)}
			</SidebarMenu>
		</SidebarGroup>
	);
}
