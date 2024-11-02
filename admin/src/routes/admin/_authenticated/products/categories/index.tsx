import { useAlertDialog } from "@/components/alert-dialog-provider";
import { DashboardLayout, DashboardLayoutProps } from "@/components/dashboard-layout";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { CategoriesTable } from "@/features/categories/components/categories-table";
import { Category } from "@/features/categories/components/types";
import { bulkDeleteCategories, categoriesQueryOptions } from "@/features/categories/services";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { toast } from "sonner";

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

function useCategoriesData() {
	const { data: categories, ...rest } = useSuspenseQuery(categoriesQueryOptions);
	return { categories, ...rest };
}

function useCategoryBulkDeleteMutation() {
	return useMutation({
		mutationFn: (categoryIds: string[]) => bulkDeleteCategories(categoryIds),
		onSuccess: () => {
			toast.success("Categories deleted successfully", {
				duration: 1000,
			});
		},
	});
}

function useHandleBulkDelete(refetchCategories: () => void) {
	const { confirm } = useAlertDialog();
	const bulkDeleteMutation = useCategoryBulkDeleteMutation();

	const handleBulkDelete = async (categories: Category[]) => {
		const categoryIds = categories.map((category) => category.id);
		const confirmed = await confirm({
			title: "Delete categories",
			description: `Are you sure you want to delete ${categoryIds.length} categories?`,
			actionName: "Delete",
			actionVariant: "destructive",
		});

		if (!confirmed) return;

		bulkDeleteMutation.mutate(categoryIds, {
			onSuccess: refetchCategories,
		});
	};

	return handleBulkDelete;
}

function Page() {
	const { categories, isLoading, refetch: refetchCategories } = useCategoriesData();

	const handleBulkDelete = useHandleBulkDelete(refetchCategories);

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
					<CategoriesTable categories={categories} onBulkDelete={handleBulkDelete} />
				)}
			</main>
		</DashboardLayout>
	);
}
