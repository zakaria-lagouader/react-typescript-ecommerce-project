import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, DashboardLayoutProps } from "@/components/dashboard-layout";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { PageTitle } from "@/components/page-title";

export const Route = createFileRoute("/admin/_authenticated/products/create")({
	component: Page,
});

const OPTIONS: Option[] = [
	{ label: "nextjs", value: "Nextjs" },
	{ label: "Vite", value: "vite" },
	{ label: "Nuxt", value: "nuxt" },
	{ label: "Vue", value: "vue" },
	{ label: "Remix", value: "remix" },
	{ label: "Svelte", value: "svelte" },
	{ label: "Angular", value: "angular" },
	{ label: "Ember", value: "ember" },
	{ label: "React", value: "react" },
	{ label: "Gatsby", value: "gatsby" },
	{ label: "Astro", value: "astro" },
];

const breadcrumb: DashboardLayoutProps["breadcrumb"] = [
	{ title: "Products", url: "/admin/products" },
	{ title: "Create Product" },
];

function Page() {
	return (
		<DashboardLayout breadcrumb={breadcrumb}>
			<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-8">
				<div className="mx-auto w-full max-w-screen-lg grid flex-1 auto-rows-max gap-4">
					<PageTitle title="Create Product" backButtonUrl="/admin/products" />
					<div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
						<div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
							<Card>
								<CardHeader>
									<CardTitle>Product Details</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-2 gap-6">
										<div className="grid gap-3">
											<Label htmlFor="name">Name</Label>
											<Input
												id="name"
												type="text"
												className="w-full"
												defaultValue="Gamer Gear Pro Controller"
											/>
										</div>
										<div className="grid gap-3">
											<Label htmlFor="name">Slug</Label>
											<Input
												id="name"
												type="text"
												className="w-full"
												defaultValue="Gamer Gear Pro Controller"
											/>
										</div>
										<div className="grid gap-3 col-span-2">
											<Label htmlFor="description">
												Description
											</Label>
											<Textarea
												id="description"
												defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
												className="min-h-32"
											/>
										</div>
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Images</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="bg-secondary rounded-lg p-6 text-center">
										Drag your images here
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Pricing</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-2 gap-6">
										<div className="grid gap-3">
											<Label htmlFor="name">Price</Label>
											<Input
												id="name"
												type="text"
												className="w-full"
												defaultValue="Gamer Gear Pro Controller"
											/>
										</div>
										<div className="grid gap-3">
											<Label htmlFor="name">
												Compare at price
											</Label>
											<Input
												id="name"
												type="text"
												className="w-full"
												defaultValue="Gamer Gear Pro Controller"
											/>
										</div>
										<div className="grid gap-3">
											<Label htmlFor="name">Cost per item</Label>
											<Input
												id="name"
												type="text"
												className="w-full"
												defaultValue="Gamer Gear Pro Controller"
											/>
										</div>
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Inventory</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-2 gap-6">
										<div className="grid gap-3">
											<Label htmlFor="name">
												SKU (Stock Keeping Unit)
											</Label>
											<Input
												id="name"
												type="text"
												className="w-full"
												defaultValue="Gamer Gear Pro Controller"
											/>
										</div>
										<div className="grid gap-3">
											<Label htmlFor="name">
												Barcode (ISBN, UPC, GTIN, etc.)
											</Label>
											<Input
												id="name"
												type="text"
												className="w-full"
												defaultValue="Gamer Gear Pro Controller"
											/>
										</div>
										<div className="grid gap-3">
											<Label htmlFor="name">Quantity</Label>
											<Input
												id="name"
												type="text"
												className="w-full"
												defaultValue="Gamer Gear Pro Controller"
											/>
										</div>
										<div className="grid gap-3">
											<Label htmlFor="name">Security stock</Label>
											<Input
												id="name"
												type="text"
												className="w-full"
												defaultValue="Gamer Gear Pro Controller"
											/>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
						<div className="grid auto-rows-max items-start gap-4 lg:gap-8">
							<Card>
								<CardHeader>
									<CardTitle>Product Status</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid gap-6">
										<div className="grid gap-3">
											<Label htmlFor="status">Status</Label>
											<Select>
												<SelectTrigger
													id="status"
													aria-label="Select status"
												>
													<SelectValue placeholder="Select status" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="draft">
														Draft
													</SelectItem>
													<SelectItem value="published">
														Active
													</SelectItem>
													<SelectItem value="archived">
														Archived
													</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Associations</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid gap-6">
										<div className="grid gap-3">
											<Label htmlFor="status">Brand</Label>
											<Select>
												<SelectTrigger
													id="status"
													aria-label="Select status"
												>
													<SelectValue placeholder="Select status" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="draft">
														Draft
													</SelectItem>
													<SelectItem value="published">
														Active
													</SelectItem>
													<SelectItem value="archived">
														Archived
													</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div className="grid gap-3">
											<Label htmlFor="status">Categories</Label>
											<MultipleSelector
												defaultOptions={OPTIONS}
												placeholder="Select frameworks you like..."
												emptyIndicator={
													<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
														no results found.
													</p>
												}
											/>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Button variant="outline">Discard</Button>
						<Button>Save Product</Button>
					</div>
				</div>
			</main>
		</DashboardLayout>
	);
}
