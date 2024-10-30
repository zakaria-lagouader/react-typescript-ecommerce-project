import { Loader } from "lucide-react";

export function PageLoadingIndicator() {
	return (
		<div className="w-screen h-screen bg-background flex items-center justify-center">
			<Loader className="animate-spin" />
		</div>
	);
}
