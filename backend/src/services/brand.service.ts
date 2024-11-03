import { brandSchema } from "@/schemas/brand.schema";
import { db } from "@/utils/db";
import { z } from "zod";

export async function getAllBrands() {
	const brands = await db.brand.findMany();

	return brands;
}

export async function getBrandById(id: string) {
	const brand = await db.brand.findUnique({
		where: { id },
	});
	return brand;
}

export async function createBrand(data: z.infer<typeof brandSchema>) {
	const brand = await db.brand.create({
		data,
	});
	return brand;
}

export async function updateBrandById(id: string, data: z.infer<typeof brandSchema>) {
	const brand = await db.brand.update({
		where: { id },
		data,
	});
	return brand;
}

export async function deleteBrandById(id: string) {
	const brand = await db.brand.delete({
		where: { id },
	});
	return brand;
}

export async function bulkDeleteBrands(ids: string[]) {
	const brands = await db.brand.deleteMany({
		where: { id: { in: ids } },
	});
	return brands;
}
