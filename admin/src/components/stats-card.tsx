import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";

interface StatsCardProps {
	title: string;
	value: string;
	icon: LucideIcon;
	subText?: string;
}

export default function StatsCard({ title, value, icon: Icon, subText }: StatsCardProps) {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				<Icon className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{value}</div>
				{subText && <p className="text-xs text-muted-foreground">{subText}</p>}
			</CardContent>
		</Card>
	);
}
