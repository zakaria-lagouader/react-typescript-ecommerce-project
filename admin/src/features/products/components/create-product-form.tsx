import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	createProductSchema,
	TCreateProductSchema,
} from "@/features/products/schemas/createProductSchema";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";
import { FileUploader } from "@/components/file-uploader";

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

interface CreateProductFormProps {
	onSubmit: (values: TCreateProductSchema) => void;
}

const defaultValues: TCreateProductSchema = {
	name: "",
	slug: "",
	description: "",
	images: [],
	price: 0,
	compareAtPrice: 0,
	costPerItem: 0,
	quantity: 0,
	sku: "",
	status: "draft",
	brand: "",
	categories: [],
};

export function CreateProductForm({ onSubmit }: CreateProductFormProps) {
	const form = useForm<TCreateProductSchema>({
		resolver: zodResolver(createProductSchema),
		defaultValues,
	});

	const isUploading = false;

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="grid auto-rows-max gap-4">
				<div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
					<div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
						<Card>
							<CardHeader>
								<CardTitle>Product Details</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 gap-6">
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem className="grid gap-2">
												<FormLabel>Name</FormLabel>
												<FormControl>
													<Input type="text" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="slug"
										render={({ field }) => (
											<FormItem className="grid gap-2">
												<FormLabel>Slug</FormLabel>
												<FormControl>
													<Input type="text" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="description"
										render={({ field }) => (
											<FormItem className="grid gap-3 col-span-2">
												<FormLabel>Description</FormLabel>
												<FormControl>
													<Textarea
														className="min-h-32"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Images</CardTitle>
							</CardHeader>
							<CardContent>
								<FormField
									control={form.control}
									name="images"
									render={({ field }) => (
										<div className="space-y-6">
											<FormItem className="w-full">
												<FormControl>
													<FileUploader
														value={field.value}
														onValueChange={field.onChange}
														maxFileCount={4}
														maxSize={4 * 1024 * 1024}
														disabled={isUploading}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										</div>
									)}
								/>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Pricing</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 gap-6">
									<FormField
										control={form.control}
										name="price"
										render={({ field }) => (
											<FormItem className="grid gap-2">
												<FormLabel>Price</FormLabel>
												<FormControl>
													<Input
														type="number"
														{...field}
														onChange={(e) =>
															field.onChange(
																e.target
																	.valueAsNumber
															)
														}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="compareAtPrice"
										render={({ field }) => (
											<FormItem className="grid gap-2">
												<FormLabel>Compare at price</FormLabel>
												<FormControl>
													<Input
														type="number"
														{...field}
														onChange={(e) =>
															field.onChange(
																e.target
																	.valueAsNumber
															)
														}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="costPerItem"
										render={({ field }) => (
											<FormItem className="grid gap-2">
												<FormLabel>Cost per item</FormLabel>
												<FormControl>
													<Input
														type="number"
														{...field}
														onChange={(e) =>
															field.onChange(
																e.target
																	.valueAsNumber
															)
														}
													/>
												</FormControl>
												<FormDescription>
													Customers won't see this price.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Inventory</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 gap-6">
									<FormField
										control={form.control}
										name="sku"
										render={({ field }) => (
											<FormItem className="grid gap-2">
												<FormLabel>
													SKU (Stock Keeping Unit)
												</FormLabel>
												<FormControl>
													<Input type="text" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="quantity"
										render={({ field }) => (
											<FormItem className="grid gap-2">
												<FormLabel>Quantity</FormLabel>
												<FormControl>
													<Input
														type="number"
														{...field}
														onChange={(e) =>
															field.onChange(
																e.target
																	.valueAsNumber
															)
														}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
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
									<FormField
										control={form.control}
										name="status"
										render={({ field }) => (
											<FormItem className="grid gap-2">
												<FormLabel>Status</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger
															id="status"
															aria-label="Select status"
														>
															<SelectValue placeholder="Select status" />
														</SelectTrigger>
													</FormControl>
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
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Associations</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-6">
									<FormField
										control={form.control}
										name="brand"
										render={({ field }) => (
											<FormItem className="grid gap-2">
												<FormLabel>Brand</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger
															id="brand"
															aria-label="Select brand"
														>
															<SelectValue placeholder="Select brand" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="brand 1">
															brand 1
														</SelectItem>
														<SelectItem value="brand 2">
															brand 2
														</SelectItem>
														<SelectItem value="brand 3">
															brand 3
														</SelectItem>
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="categories"
										render={({ field }) => (
											<FormItem className="grid gap-2">
												<FormLabel>Categories</FormLabel>
												<FormControl>
													<MultipleSelector
														{...field}
														defaultOptions={OPTIONS}
														placeholder="Select categories"
														emptyIndicator={
															<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
																no results found.
															</p>
														}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline" asChild>
						<Link to="/admin/products">Discard</Link>
					</Button>
					<Button>Save Product</Button>
				</div>
			</form>
		</Form>
	);
}
