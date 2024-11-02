import { useAlertDialog } from "@/components/alert-dialog-provider";
import { DashboardLayout, DashboardLayoutProps } from "@/components/dashboard-layout";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { CategoriesTable } from "@/features/categories/components/categories-table";
import { Category } from "@/features/categories/components/types";
import { categoriesQueryOptions } from "@/features/categories/services";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/admin/_authenticated/products/categories/")({
	loader: ({ context: { queryClient } }) => {
		queryClient.ensureQueryData(categoriesQueryOptions);
	},
	component: Page,
});

const breadcrumb: DashboardLayoutProps["breadcrumb"] = [
	{ title: "Products", url: "/admin/products" },
	{ title: "Categories List" },
];

function useCatgoriesData() {
	const { data: categories, ...rest } = useSuspenseQuery(categoriesQueryOptions);
	return { categories, ...rest };
}

function Page() {
	const { categories, isLoading } = useCatgoriesData();
	const { confirm } = useAlertDialog();

	const handleDeleteBulk = async (data: Category[]) => {
		const categoryIds = data.map((category) => category.id);
		const confirmed = await confirm({
			title: "Delete categories",
			description: `Are you sure you want to delete ${categoryIds.length} categories?`,
			actionName: "Delete",
			actionVariant: "destructive",
		});

		if (!confirmed) return;
		console.log("Deleting categories", categoryIds);
	};

	return (
		<DashboardLayout breadcrumb={breadcrumb}>
			<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
				<PageTitle
					title="Categories List"
					action={
						<Button asChild>
							<Link to="/admin/products/categories/create">
								<Plus className="h-4 w-4" />
								New category
							</Link>
						</Button>
					}
				/>
				{!isLoading && (
					<CategoriesTable categories={categories} onDeleteBulk={handleDeleteBulk} />
				)}
			</main>
		</DashboardLayout>
	);
}