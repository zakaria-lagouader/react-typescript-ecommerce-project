import { z } from "zod";

export const categorySchema = z.object({
	name: z.string().min(3, "Name must be at least 3 character"),
	slug: z.string().min(3, "Slug must be at least 3 character"),
	description: z.string().min(3, "Description must be at least 3 character"),
});

export const categoryBulkDeleteSchema = z.object({
	ids: z.array(z.string()),
});
