import { Alert } from "@/components/alert";
import { DashboardLayout, DashboardLayoutProps } from "@/components/dashboard-layout";
import { PageTitle } from "@/components/page-title";
import { CreateCategoryForm } from "@/features/categories/components/create-category-form";
import { TCategorySchema } from "@/features/categories/schemas";
import { createCategory } from "@/features/categories/services";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_authenticated/products/categories/create")({
	component: Page,
});

const breadcrumb: DashboardLayoutProps["breadcrumb"] = [
	{ title: "Products", url: "/admin/products" },
	{ title: "Create Category" },
];

function Page() {
	const navigate = useNavigate({ from: "/admin/login" });
	const { mutate, isPending, error } = useMutation({
		mutationFn: createCategory,
		onSuccess: () => {
			toast.success("Category created successfully", {
				duration: 1500,
				onAutoClose: () => {
					navigate({ to: "/admin/products/categories" });
				},
			});
		},
	});
	const onSubmit = (values: TCategorySchema) => mutate(values);

	return (
		<DashboardLayout breadcrumb={breadcrumb}>
			<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-8">
				<div className="mx-auto w-full max-w-screen-lg flex-1">
					<PageTitle
						title="Create Category"
						backButtonUrl="/admin/products/categories"
						className="mb-8"
					/>
					{error && <Alert message={error.message} variant="error" />}
					<CreateCategoryForm onSubmit={onSubmit} isPending={isPending} />
				</div>
			</main>
		</DashboardLayout>
	);
}
