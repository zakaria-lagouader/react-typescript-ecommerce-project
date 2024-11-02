import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { Trash } from "lucide-react";

interface DataTableFilterBarProps<TData> {
	table: Table<TData>;
	filterBy: string;
	onDeleteBulk?: (data: TData[]) => void;
}

export function DataTableFilterBar<TData>({
	table,
	filterBy,
	onDeleteBulk,
}: DataTableFilterBarProps<TData>) {
	const selectedRows = table.getFilteredSelectedRowModel().rows;
	const handleDeleteBulk = () => {
		if (onDeleteBulk) {
			onDeleteBulk(selectedRows.map((row) => row.original));
		}
	};
	return (
		<div className="flex items-center py-4">
			<Input
				placeholder={`Filter ${filterBy}...`}
				value={(table.getColumn(filterBy)?.getFilterValue() as string) ?? ""}
				onChange={(event) =>
					table.getColumn(filterBy)?.setFilterValue(event.target.value)
				}
				className="max-w-sm"
			/>
			<div className="ml-auto hidden lg:flex space-x-2">
				{selectedRows.length > 0 && (
					<Button
						variant="destructive"
						size="sm"
						className="h-8"
						onClick={handleDeleteBulk}
					>
						<Trash className="mr-2 h-4 w-4" />
						Delete Bulk
					</Button>
				)}
				<DataTableViewOptions table={table} />
			</div>
		</div>
	);
}
