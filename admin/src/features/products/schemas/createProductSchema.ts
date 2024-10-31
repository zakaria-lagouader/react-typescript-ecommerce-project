import { z } from "zod";

const optionSchema = z.object({
	label: z.string(),
	value: z.string(),
	disable: z.boolean().optional().default(false),
});

export const createProductSchema = z.object({
	name: z.string().min(1, "Name is required"),
	slug: z.string().min(1, "Slug is required"),
	description: z.string().min(1, "Description is required"),
	images: z.array(z.instanceof(File)).min(1),
	price: z.number().min(1, "Price is required"),
	compareAtPrice: z.number().min(1, "Compare at price is required"),
	costPerItem: z.number().min(1, "Cost per item is required"),
	quantity: z.number().min(1, "Quantity is required"),
	sku: z.string().min(1, "SKU is required"),
	status: z.enum(["draft", "published", "archived"]),
	brand: z.string().min(1, "Brand is required"),
	categories: z.array(optionSchema).min(1, "Categories is required"),
});

export type TCreateProductSchema = z.infer<typeof createProductSchema>;
