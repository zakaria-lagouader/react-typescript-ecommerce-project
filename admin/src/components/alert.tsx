import { cn } from "@/lib/utils";
import { CheckCircleIcon, X } from "lucide-react";

interface AlertProps {
	message: string;
	variant: "success" | "error";
}

export function Alert({ message, variant = "error" }: AlertProps) {
	return (
		<div
			className={cn("rounded-md p-4", {
				"bg-green-50": variant === "success",
				"bg-red-50": variant === "error",
			})}
		>
			<div className="flex">
				<div className="flex-shrink-0">
					<CheckCircleIcon
						className={cn("h-5 w-5", {
							"text-green-400": variant === "success",
							"text-red-400": variant === "error",
						})}
						aria-hidden="true"
					/>
				</div>
				<div className="ml-3">
					<p
						className={cn("text-sm font-medium", {
							"text-green-800": variant === "success",
							"text-red-800": variant === "error",
						})}
					>
						{message}
					</p>
				</div>
				<div className="ml-auto pl-3">
					<div className="-mx-1.5 -my-1.5">
						<button
							type="button"
							className={cn(
								"inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2",
								{
									"bg-green-50 text-green-500 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50":
										variant === "success",
									"bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50":
										variant === "error",
								}
							)}
						>
							<span className="sr-only">Dismiss</span>
							<X className="h-5 w-5" aria-hidden="true" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
