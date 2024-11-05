import { z } from "zod";

export const productSchema = z.object({
	name: z.string().min(3, "Name must be at least 3 character"),
	slug: z.string().min(3, "Slug must be at least 3 character"),
	website: z.string().url("Website must be at least 3 character"),
	description: z.string().min(3, "Description must be at least 3 character"),
});
