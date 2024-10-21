import React from "react";

interface AuthLayoutProps {
	children?: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<div className="w-full h-screen lg:grid lg:grid-cols-2">
			<div className="h-full flex items-center justify-center py-12">{children}</div>
			<div className="hidden bg-muted lg:block">
				<img
					src="/placeholder.svg"
					alt="Image"
					width="1920"
					height="1080"
					className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
		</div>
	);
}
