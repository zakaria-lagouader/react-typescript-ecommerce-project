import { Alert } from "@/components/alert";
import { useAlertDialog } from "@/components/alert-dialog-provider";
import { DashboardLayout, DashboardLayoutProps } from "@/components/dashboard-layout";
import { PageTitle } from "@/components/page-title";
import { CreateBrandForm } from "@/features/brands/components/create-brand-form";
import { TBrandSchema } from "@/features/brands/schemas";
import { deleteBrand, getBrandQueryOptions, updateBrand } from "@/features/brands/services";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_authenticated/products/brands/$id/edit")({
	loader: ({ context: { queryClient }, params: { id } }) => {
		return queryClient.ensureQueryData(getBrandQueryOptions(id));
	},
	component: Page,
});

const breadcrumb: DashboardLayoutProps["breadcrumb"] = [
	{ title: "Products", url: "/admin/products" },
	{ title: "Update Brand" },
];

function useBrandData(id: string) {
	const { data: brand, ...rest } = useSuspenseQuery(getBrandQueryOptions(id));
	return { brand, ...rest };
}

function useBrandUpdateMutation(id: string) {
	return useMutation({
		mutationFn: (values: TBrandSchema) => updateBrand(id, values),
		onSuccess: () => {
			toast.success("Brand updated successfully", {
				duration: 1000,
			});
		},
	});
}

function useBrandDeleteMutation(id: string) {
	const navigate = useNavigate({ from: "/admin/login" });
	return useMutation({
		mutationFn: () => deleteBrand(id),
		onSuccess: () => {
			navigate({ to: "/admin/products/brands", replace: true });
		},
	});
}

function Page() {
	const { id } = Route.useParams();

	const { confirm } = useAlertDialog();

	const { brand, isLoading } = useBrandData(id);

	const updateMutation = useBrandUpdateMutation(id);

	const deleteMutation = useBrandDeleteMutation(id);

	const onSubmit = (values: TBrandSchema) => updateMutation.mutate(values);

	const onDelete = async () => {
		const confirmed = await confirm({
			title: "Delete Brand",
			description: "Are you sure you want to delete this brand?",
			actionName: "delete",
			actionVariant: "destructive",
		});
		if (!confirmed) return;
		deleteMutation.mutate();
	};

	return (
		<DashboardLayout breadcrumb={breadcrumb}>
			<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-8">
				<div className="mx-auto w-full max-w-screen-lg flex-1">
					<PageTitle
						title="Edit Brand"
						backButtonUrl="/admin/products/brands"
						className="mb-8"
					/>
					{updateMutation.error && (
						<Alert message={updateMutation.error.message} variant="error" />
					)}
					{!isLoading && (
						<CreateBrandForm
							onSubmit={onSubmit}
							onDelete={onDelete}
							isPending={updateMutation.isPending || deleteMutation.isPending}
							defaultValues={brand}
							editMode
						/>
					)}
				</div>
			</main>
		</DashboardLayout>
	);
}
