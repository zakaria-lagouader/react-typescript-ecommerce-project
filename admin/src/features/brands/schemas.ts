import { z } from "zod";

export const brandSchema = z.object({
	name: z.string().min(3, "Name must be at least 3 character"),
	slug: z.string().min(3, "Slug must be at least 3 character"),
	website: z.string().url("Invalid URL format"),
	description: z.string().min(3, "Description must be at least 3 character"),
});

export type TBrandSchema = z.infer<typeof brandSchema>;
