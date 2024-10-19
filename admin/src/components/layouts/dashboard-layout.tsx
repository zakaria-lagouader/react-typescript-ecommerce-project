import { Fragment } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import { ModeToggle } from "@/components/mode-toggle";

interface DashboardLayoutProps {
	children?: React.ReactNode;
	breadcrumb: {
		title: string;
		url?: string;
	}[];
}

export function DashboardLayout({ children, breadcrumb }: DashboardLayoutProps) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4 w-full">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<Breadcrumb>
							<BreadcrumbList>
								{breadcrumb.map((item, idx) => (
									<Fragment key={item.title}>
										<BreadcrumbItem
											className={
												item.url !== undefined
													? "hidden md:block"
													: ""
											}
										>
											{item.url === undefined ? (
												<BreadcrumbPage>
													{item.title}
												</BreadcrumbPage>
											) : (
												<BreadcrumbLink asChild>
													<Link to={item.url}>
														{item.title}
													</Link>
												</BreadcrumbLink>
											)}
										</BreadcrumbItem>
										{breadcrumb.length !== idx + 1 && (
											<BreadcrumbSeparator className="hidden md:block" />
										)}
									</Fragment>
								))}
								<BreadcrumbItem></BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
						<ModeToggle />
					</div>
				</header>
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
