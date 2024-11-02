import { Category } from "@/features/categories/components/types";
import { TCategorySchema } from "@/features/categories/schemas";
import { api } from "@/lib/api";
import { queryOptions } from "@tanstack/react-query";

export const getCategories = async () => api.get("/categories") as Promise<Category[]>;
export const getCategory = async (id: string) => api.get(`/categories/${id}`) as Promise<Category>;
export const createCategory = async (data: TCategorySchema) =>
	api.post("/categories", data) as Promise<Category>;
export const updateCategory = async (id: string, data: TCategorySchema) =>
	api.put(`/categories/${id}`, data) as Promise<Category>;
export const deleteCategory = async (id: string) =>
	api.delete(`/categories/${id}`) as Promise<{
		message: string;
	}>;
export const bulkDeleteCategories = async (ids: string[]) =>
	api.post("/categories/bulk-delete", { ids }) as Promise<{
		message: string;
	}>;

export const categoriesQueryOptions = queryOptions({
	queryKey: ["categories"],
	queryFn: getCategories,
});

export const getCategoryQueryOptions = (id: string) =>
	queryOptions({
		queryKey: ["categories", { id }],
		queryFn: () => getCategory(id),
	});
