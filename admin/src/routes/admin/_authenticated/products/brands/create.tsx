import { Alert } from "@/components/alert";
import { DashboardLayout, DashboardLayoutProps } from "@/components/dashboard-layout";
import { PageTitle } from "@/components/page-title";
import { CreateBrandForm } from "@/features/brands/components/create-brand-form";
import { TBrandSchema } from "@/features/brands/schemas";
import { createBrand } from "@/features/brands/services";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_authenticated/products/brands/create")({
	component: Page,
});

const breadcrumb: DashboardLayoutProps["breadcrumb"] = [
	{ title: "Products", url: "/admin/products" },
	{ title: "Create Brand" },
];

function useBrandMutation() {
	const navigate = useNavigate({ from: "/admin/products/brands/create" });
	return useMutation({
		mutationFn: createBrand,
		onSuccess: (brand) => {
			toast.success("Brand created successfully", {
				duration: 1500,
				onAutoClose: () => {
					navigate({
						to: "/admin/products/brands/$id/edit",
						params: { id: brand.id },
					});
				},
			});
		},
	});
}

function Page() {
	const brandMutation = useBrandMutation();

	const onSubmit = (values: TBrandSchema) => brandMutation.mutate(values);

	return (
		<DashboardLayout breadcrumb={breadcrumb}>
			<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-8">
				<div className="mx-auto w-full max-w-screen-lg flex-1">
					<PageTitle
						title="Create Brand"
						backButtonUrl="/admin/products/brands"
						className="mb-8"
					/>
					{brandMutation.isError && (
						<Alert message={brandMutation.error.message} variant="error" />
					)}
					<CreateBrandForm onSubmit={onSubmit} isPending={brandMutation.isPending} />
				</div>
			</main>
		</DashboardLayout>
	);
}
