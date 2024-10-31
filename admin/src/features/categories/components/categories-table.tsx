import { DataTable } from "@/components/data-table/data-table";
import { Category } from "@/features/categories/components/types";
import { columns } from "@/features/categories/components/categories-table-columns";

interface CategoriesTableProps {
	categories: Category[];
}

export function CategoriesTable({ categories }: CategoriesTableProps) {
	return <DataTable data={categories} columns={columns} filterBy="name" />;
}
