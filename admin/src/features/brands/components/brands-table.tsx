import { DataTable } from "@/components/data-table/data-table";
import { Brand } from "@/features/brands/types";
import { columns } from "@/features/brands/components/brands-table-columns";

interface BrandsTableProps {
	brands: Brand[];
	onBulkDelete?: (data: Brand[]) => void;
}

export function BrandsTable({ brands, onBulkDelete }: BrandsTableProps) {
	return (
		<DataTable data={brands} columns={columns} filterBy="name" onBulkDelete={onBulkDelete} />
	);
}
