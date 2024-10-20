import React from "react";

interface PageTitleProps {
	title: string;
	action?: React.ReactNode;
}

export function PageTitle({ title, action }: PageTitleProps) {
	return (
		<div className="flex items-center justify-between">
			<h2 className="text-3xl font-bold tracking-tight">{title}</h2>
			{action}
		</div>
	);
}
