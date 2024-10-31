import { PageTitle } from "@/components/page-title";
import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, DashboardLayoutProps } from "@/components/dashboard-layout";
import { CreateProductForm } from "@/features/products/components/create-product-form";
import { TCreateProductSchema } from "@/features/products/schemas/createProductSchema";

export const Route = createFileRoute("/admin/_authenticated/products/create")({
	component: Page,
});

const breadcrumb: DashboardLayoutProps["breadcrumb"] = [
	{ title: "Products", url: "/admin/products" },
	{ title: "Create Product" },
];

function Page() {
	const onSubmit = (values: TCreateProductSchema) => {
		console.log(values);
	};
	return (
		<DashboardLayout breadcrumb={breadcrumb}>
			<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-8">
				<div className="mx-auto w-full max-w-screen-lg flex-1">
					<PageTitle
						title="Create Product"
						backButtonUrl="/admin/products"
						className="mb-4"
					/>
					<CreateProductForm onSubmit={onSubmit} />
				</div>
			</main>
		</DashboardLayout>
	);
}
