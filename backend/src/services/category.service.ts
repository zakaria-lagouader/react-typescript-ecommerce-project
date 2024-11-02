import { categorySchema } from "@/schemas/category.schema";
import { db } from "@/utils/db";
import { z } from "zod";

export async function getAllCategories() {
	const categories = await db.category.findMany();

	return categories;
}

export async function getCategoryById(id: string) {
	const category = await db.category.findUnique({
		where: { id },
	});
	return category;
}

export async function createCategory(data: z.infer<typeof categorySchema>) {
	const category = await db.category.create({
		data,
	});
	return category;
}

export async function updateCategoryById(id: string, data: z.infer<typeof categorySchema>) {
	const category = await db.category.update({
		where: { id },
		data,
	});
	return category;
}

export async function deleteCategoryById(id: string) {
	const category = await db.category.delete({
		where: { id },
	});
	return category;
}

export async function bulkDeleteCategories(ids: string[]) {
	const categories = await db.category.deleteMany({
		where: { id: { in: ids } },
	});
	return categories;
}
