import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/features/products/components/products-table-columns";
import { Product } from "@/features/products/types";

interface ProductsTableProps {
	products: Product[];
}

export function ProductsTable({ products }: ProductsTableProps) {
	return <DataTable data={products} columns={columns} filterBy="name" />;
}
