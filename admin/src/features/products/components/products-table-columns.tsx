import { Product } from "@/features/products/types";
import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck, Delete, MoreHorizontal, Pencil, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { getSelectColumn } from "@/components/data-table/data-table-select-columns";

export const columns: ColumnDef<Product>[] = [
	getSelectColumn<Product>(),
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
		header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
	},
	{
		accessorKey: "brand",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Brand" />,
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
		header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("price"));
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(amount);

			return <div className="font-medium">{formatted}</div>;
		},
	},
	{
		accessorKey: "SKU",
		header: "SKU",
	},
	{
		accessorKey: "quantity",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Quantity" />,
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const product = row.original;
			console.log(product);

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>
							<Pencil className="h-4 w-4" />
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Delete className="h-4 w-4" />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
