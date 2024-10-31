import { Category } from "@/features/categories/components/types";
import { TCategorySchema } from "@/features/categories/schemas";
import { api } from "@/lib/api";
import { queryOptions } from "@tanstack/react-query";

export const getCategories = async () => api.get<Category[]>("/categories");

export const createCategory = async (data: TCategorySchema) =>
	api.post<Category>("/categories", data);

export const categoriesQueryOptions = queryOptions({
	queryKey: ["categories"],
	queryFn: getCategories,
});
