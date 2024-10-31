import { z } from "zod";

const optionSchema = z.object({
	label: z.string(),
	value: z.string(),
	disable: z.boolean().optional().default(false),
});

export const createProductSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	slug: z.string().min(1, { message: "Slug is required" }),
	description: z.string().min(1, { message: "Description is required" }),
	images: z.array(z.instanceof(File)).min(1, { message: "At least one image is required" }),
	price: z.number().positive({ message: "Price is required" }),
	compareAtPrice: z.number().positive({ message: "Compare at price is required" }),
	costPerItem: z.number().positive({ message: "Cost per item is required" }),
	quantity: z.number().positive({ message: "Quantity is required" }),
	sku: z.string().min(1, { message: "SKU is required" }),
	status: z.enum(["draft", "published", "archived"], {
		message: "Status must be one of 'draft', 'published', or 'archived'",
	}),
	brand: z.string().min(1, { message: "Brand is required" }),
	categories: z.array(optionSchema).min(1, { message: "At least one category is required" }),
});

export type TCreateProductSchema = z.infer<typeof createProductSchema>;
