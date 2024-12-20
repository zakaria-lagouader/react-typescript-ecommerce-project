import { Button } from "@/components/ui/button";
import { ValidRoutes } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import React from "react";

interface PageTitleProps {
	title: string;
	action?: React.ReactNode;
	backButtonUrl?: ValidRoutes;
	className?: string;
}

export function PageTitle({ title, action, backButtonUrl, className }: PageTitleProps) {
	return (
		<div className={cn("flex items-center gap-2", className)}>
			{backButtonUrl && (
				<Button variant="outline" size="icon" className="h-7 w-7" asChild>
					<Link to={backButtonUrl}>
						<ChevronLeft className="h-4 w-4" />
						<span className="sr-only">Back</span>
					</Link>
				</Button>
			)}
			<h2 className="text-3xl font-bold tracking-tight">{title}</h2>
			<div className="flex-1"></div>
			{action}
		</div>
	);
}
