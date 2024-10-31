import { ColumnDef } from "@tanstack/react-table";
import { Delete, MoreHorizontal, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { getSelectColumn } from "@/components/data-table/data-table-select-columns";
import { Category } from "@/features/categories/components/types";

export const columns: ColumnDef<Category>[] = [
	getSelectColumn<Category>(),
	{
		accessorKey: "name",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
	},
	{
		accessorKey: "slug",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Slug" />,
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const category = row.original;

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
