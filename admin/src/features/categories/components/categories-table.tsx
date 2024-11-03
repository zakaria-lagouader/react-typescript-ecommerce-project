import { DataTable } from "@/components/data-table/data-table";
import { Category } from "@/features/categories/types";
import { columns } from "@/features/categories/components/categories-table-columns";

interface CategoriesTableProps {
	categories: Category[];
	onBulkDelete?: (data: Category[]) => void;
}

export function CategoriesTable({ categories, onBulkDelete }: CategoriesTableProps) {
	return (
		<DataTable
			data={categories}
			columns={columns}
			filterBy="name"
			onBulkDelete={onBulkDelete}
		/>
	);
}
