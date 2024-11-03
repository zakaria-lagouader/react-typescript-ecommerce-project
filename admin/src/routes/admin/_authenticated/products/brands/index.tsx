import { useAlertDialog } from "@/components/alert-dialog-provider";
import { DashboardLayout, DashboardLayoutProps } from "@/components/dashboard-layout";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { BrandsTable } from "@/features/brands/components/brands-table";
import { Brand } from "@/features/brands/types";
import { bulkDeleteBrands, brandsQueryOptions } from "@/features/brands/services";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_authenticated/products/brands/")({
	loader: ({ context: { queryClient } }) => {
		queryClient.ensureQueryData(brandsQueryOptions);
	},
	component: Page,
});

const breadcrumb: DashboardLayoutProps["breadcrumb"] = [
	{ title: "Products", url: "/admin/products" },
	{ title: "Brands List" },
];

function useBrandsData() {
	const { data: brands, ...rest } = useSuspenseQuery(brandsQueryOptions);
	return { brands, ...rest };
}

function useBrandBulkDeleteMutation() {
	return useMutation({
		mutationFn: (brandIds: string[]) => bulkDeleteBrands(brandIds),
		onSuccess: () => {
			toast.success("Brands deleted successfully", {
				duration: 1000,
			});
		},
	});
}

function useHandleBulkDelete(refetchBrands: () => void) {
	const { confirm } = useAlertDialog();
	const bulkDeleteMutation = useBrandBulkDeleteMutation();

	const handleBulkDelete = async (brands: Brand[]) => {
		const brandIds = brands.map((brand) => brand.id);
		const confirmed = await confirm({
			title: "Delete brands",
			description: `Are you sure you want to delete ${brandIds.length} brands?`,
			actionName: "Delete",
			actionVariant: "destructive",
		});

		if (!confirmed) return;

		bulkDeleteMutation.mutate(brandIds, {
			onSuccess: refetchBrands,
		});
	};

	return handleBulkDelete;
}

function Page() {
	const { brands, isLoading, refetch: refetchBrands } = useBrandsData();

	const handleBulkDelete = useHandleBulkDelete(refetchBrands);

	return (
		<DashboardLayout breadcrumb={breadcrumb}>
			<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
				<PageTitle
					title="Brands List"
					action={
						<Button asChild>
							<Link to="/admin/products/brands/create">
								<Plus className="h-4 w-4" />
								New brand
							</Link>
						</Button>
					}
				/>
				{!isLoading && <BrandsTable brands={brands} onBulkDelete={handleBulkDelete} />}
			</main>
		</DashboardLayout>
	);
}
