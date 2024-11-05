import { productSchema } from "@/schemas/product.schema";
import { db } from "@/utils/db";
import { z } from "zod";

export async function getAllProducts() {
	const products = await db.product.findMany();

	return products;
}

export async function getProductById(id: string) {
	const product = await db.product.findUnique({
		where: { id },
	});
	return product;
}

export async function createProduct(data: z.infer<typeof productSchema>) {
	const product = await db.product.create({
		data,
	});
	return product;
}

export async function updateProductById(id: string, data: z.infer<typeof productSchema>) {
	const product = await db.product.update({
		where: { id },
		data,
	});
	return product;
}

export async function deleteProductById(id: string) {
	const product = await db.product.delete({
		where: { id },
	});
	return product;
}

export async function bulkDeleteProducts(ids: string[]) {
	const products = await db.product.deleteMany({
		where: { id: { in: ids } },
	});
	return products;
}
