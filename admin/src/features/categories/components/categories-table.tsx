import { DataTable } from "@/components/data-table/data-table";
import { Category } from "@/features/categories/components/types";
import { columns } from "@/features/categories/components/categories-table-columns";

interface CategoriesTableProps {
	categories: Category[];
	onDeleteBulk?: (data: Category[]) => void;
}

export function CategoriesTable({ categories, onDeleteBulk }: CategoriesTableProps) {
	return (
		<DataTable
			data={categories}
			columns={columns}
			filterBy="name"
			onDeleteBulk={onDeleteBulk}
		/>
	);
}