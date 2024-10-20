import { Product } from "@/features/products/types";
import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck, MoreHorizontal, XCircle, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<Product>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "image",
		header: "Image",
		cell: ({ row }) => {
			const imageURL: string = row.getValue("image");
			const name: string = row.getValue("name");
			return <img src={imageURL} alt={name} className="w-10 h-10 bg-cover" />;
		},
	},
	{
		accessorKey: "name",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "brand",
		header: "Brand",
	},
	{
		accessorKey: "visibility",
		header: "visibility",
		cell: ({ row }) => {
			const visibility: boolean = row.getValue("visibility");
			return visibility ? (
				<CircleCheck className="w-5 h-5 text-green-500 mx-auto" />
			) : (
				<XCircle className="w-5 h-5 text-red-500 mx-auto" />
			);
		},
	},
	{
		accessorKey: "price",
		header: () => <div className="text-right">Price</div>,
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("price"));
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(amount);

			return <div className="text-right font-medium">{formatted}</div>;
		},
	},
	{
		accessorKey: "SKU",
		header: "SKU",
	},
	{
		accessorKey: "quantity",
		header: "Quantity",
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const product = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(product.name)}
						>
							Copy payment ID
						</DropdownMenuItem>
						<DropdownMenuItem>Edit</DropdownMenuItem>
						<DropdownMenuItem>Delete</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
