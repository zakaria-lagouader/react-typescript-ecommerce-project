import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";

interface DataTableFilterBarProps<TData> {
	table: Table<TData>;
	filterBy: string;
}

export function DataTableFilterBar<TData>({ table, filterBy }: DataTableFilterBarProps<TData>) {
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
			<DataTableViewOptions table={table} />
		</div>
	);
}
