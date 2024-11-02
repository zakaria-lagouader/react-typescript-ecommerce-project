import { Alert } from "@/components/alert";
import { useAlertDialog } from "@/components/alert-dialog-provider";
import { DashboardLayout, DashboardLayoutProps } from "@/components/dashboard-layout";
import { PageTitle } from "@/components/page-title";
import { CreateCategoryForm } from "@/features/categories/components/create-category-form";
import { TCategorySchema } from "@/features/categories/schemas";
import {
	deleteCategory,
	getCategoryQueryOptions,
	updateCategory,
} from "@/features/categories/services";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_authenticated/products/categories/$id/edit")({
	loader: ({ context: { queryClient }, params: { id } }) => {
		return queryClient.ensureQueryData(getCategoryQueryOptions(id));
	},
	component: Page,
});

const breadcrumb: DashboardLayoutProps["breadcrumb"] = [
	{ title: "Products", url: "/admin/products" },
	{ title: "Update Category" },
];

function useCatgoryData(id: string) {
	const { data: category, ...rest } = useSuspenseQuery(getCategoryQueryOptions(id));
	return { category, ...rest };
}

function useCategoryUpdateMutation(id: string) {
	return useMutation({
		mutationFn: (values: TCategorySchema) => updateCategory(id, values),
		onSuccess: () => {
			toast.success("Category updated successfully", {
				duration: 1000,
			});
		},
	});
}

function useCategoryDeleteMutation(id: string) {
	const navigate = useNavigate({ from: "/admin/login" });
	return useMutation({
		mutationFn: () => deleteCategory(id),
		onSuccess: () => {
			navigate({ to: "/admin/products/categories", replace: true });
		},
	});
}

function Page() {
	const { id } = Route.useParams();

	const { confirm } = useAlertDialog();

	const { category, isLoading } = useCatgoryData(id);

	const updateMutation = useCategoryUpdateMutation(id);

	const deleteMutation = useCategoryDeleteMutation(id);

	const onSubmit = (values: TCategorySchema) => updateMutation.mutate(values);

	const onDelete = async () => {
		const confirmed = await confirm({
			title: "Delete Category",
			description: "Are you sure you want to delete this category?",
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
						title="Edit Category"
						backButtonUrl="/admin/products/categories"
						className="mb-8"
					/>
					{updateMutation.error && (
						<Alert message={updateMutation.error.message} variant="error" />
					)}
					{!isLoading && (
						<CreateCategoryForm
							onSubmit={onSubmit}
							onDelete={onDelete}
							isPending={updateMutation.isPending || deleteMutation.isPending}
							defaultValues={category}
							editMode
						/>
					)}
				</div>
			</main>
		</DashboardLayout>
	);
}
