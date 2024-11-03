import { Brand } from "@/features/brands/types";
import { TBrandSchema } from "@/features/brands/schemas";
import { api } from "@/lib/api";
import { queryOptions } from "@tanstack/react-query";

export const getBrands = async () => api.get("/brands") as Promise<Brand[]>;
export const getBrand = async (id: string) => api.get(`/brands/${id}`) as Promise<Brand>;
export const createBrand = async (data: TBrandSchema) =>
	api.post("/brands", data) as Promise<Brand>;
export const updateBrand = async (id: string, data: TBrandSchema) =>
	api.put(`/brands/${id}`, data) as Promise<Brand>;
export const deleteBrand = async (id: string) =>
	api.delete(`/brands/${id}`) as Promise<{
		message: string;
	}>;
export const bulkDeleteBrands = async (ids: string[]) =>
	api.post("/brands/bulk-delete", { ids }) as Promise<{
		message: string;
	}>;

export const brandsQueryOptions = queryOptions({
	queryKey: ["brands"],
	queryFn: getBrands,
});

export const getBrandQueryOptions = (id: string) =>
	queryOptions({
		queryKey: ["brands", { id }],
		queryFn: () => getBrand(id),
	});
