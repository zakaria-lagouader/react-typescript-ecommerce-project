import { Alert } from "@/components/alert";
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
	const navigate = useNavigate({ from: "/admin/login" });
	return useMutation({
		mutationFn: (values: TCategorySchema) => updateCategory(id, values),
		onSuccess: () => {
			toast.success("Category updated successfully", {
				duration: 1000,
				onAutoClose: () => {
					navigate({ to: "/admin/products/categories" });
				},
			});
		},
	});
}

function useCategoryDeleteMutation(id: string) {
	const navigate = useNavigate({ from: "/admin/login" });
	return useMutation({
		mutationFn: () => deleteCategory(id),
		onSuccess: () => {
			toast.success("Category deleted successfully", {
				duration: 1000,
				onAutoClose: () => {
					navigate({ to: "/admin/products/categories" });
				},
			});
		},
	});
}

function Page() {
	const { id } = Route.useParams();

	const { category, isLoading } = useCatgoryData(id);

	const updateMutation = useCategoryUpdateMutation(id);

	const deleteMutation = useCategoryDeleteMutation(id);

	const onSubmit = (values: TCategorySchema) => updateMutation.mutate(values);

	const onDelete = () => {
		if (confirm("Are you sure you want to delete this category?")) {
			deleteMutation.mutate();
		}
	};

	return (
		<DashboardLayout breadcrumb={breadcrumb}>
			<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-8">
				<div className="mx-auto w-full max-w-screen-lg flex-1">
					<PageTitle
						title="Create Category"
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
