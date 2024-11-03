import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { brandSchema, TBrandSchema } from "@/features/brands/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

interface CreateBrandFormProps {
	onSubmit: (values: TBrandSchema) => void;
	isPending?: boolean;
	editMode?: boolean;
	defaultValues?: TBrandSchema;
	onDelete?: () => void;
}

export function CreateBrandForm({
	onSubmit,
	isPending,
	editMode = false,
	defaultValues,
	onDelete,
}: CreateBrandFormProps) {
	const form = useForm<TBrandSchema>({
		resolver: zodResolver(brandSchema),
		defaultValues: defaultValues ?? {
			name: "",
			slug: "",
			website: "",
			description: "",
		},
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="grid auto-rows-max gap-4">
				<Card>
					<CardHeader>
						<CardTitle>Brand Details</CardTitle>
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
								name="website"
								render={({ field }) => (
									<FormItem className="grid gap-2 col-span-2">
										<FormLabel>Website</FormLabel>
										<FormControl>
											<Input type="url" {...field} />
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
											<Textarea className="min-h-32" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</CardContent>
				</Card>
				<div className="flex items-center gap-2">
					<Button variant="outline" asChild>
						<Link to="/admin/products/brands">Cancel</Link>
					</Button>
					<Button isLoading={isPending}>{editMode ? "Update" : "Save"} Brand</Button>
					{editMode && (
						<Button
							isLoading={isPending}
							variant="destructive"
							onClick={onDelete}
							type="button"
						>
							Delete
						</Button>
					)}
				</div>
			</form>
		</Form>
	);
}
