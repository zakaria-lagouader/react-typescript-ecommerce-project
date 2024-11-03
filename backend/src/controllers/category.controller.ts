import { CREATED, NOT_FOUND, OK } from "@/constants/http";
import { bulkDeleteSchema } from "@/schemas/bulk-delete";
import { categorySchema } from "@/schemas/category.schema";
import {
	bulkDeleteCategories,
	createCategory,
	deleteCategoryById,
	getAllCategories,
	getCategoryById,
	updateCategoryById,
} from "@/services/category.service";
import appAssert from "@/utils/app-assert";
import catchErrors from "@/utils/catch-errors";

export const getCategoriesHandler = catchErrors(async (req, res) => {
	const categories = await getAllCategories();

	return res.status(OK).json(categories);
});

export const getCategoryHandler = catchErrors(async (req, res) => {
	const { id } = req.params;
	const category = await getCategoryById(id);

	appAssert(category, NOT_FOUND, "Category not found");

	return res.status(OK).json(category);
});

export const createCategoryHandler = catchErrors(async (req, res) => {
	const request = categorySchema.parse(req.body);

	const category = await createCategory(request);

	return res.status(CREATED).json(category);
});

export const updateCategoryHandler = catchErrors(async (req, res) => {
	const { id } = req.params;
	const request = categorySchema.parse(req.body);

	const updatedCategory = await updateCategoryById(id, request);

	appAssert(updatedCategory, NOT_FOUND, "Category not found");

	return res.status(OK).json(updatedCategory);
});

export const deleteCategoryHandler = catchErrors(async (req, res) => {
	const { id } = req.params;
	const deletedCategory = await deleteCategoryById(id);

	appAssert(deletedCategory, NOT_FOUND, "Category not found");

	return res.status(OK).json({ message: "Category deleted" });
});

export const bulkDeleteCategoriesHandler = catchErrors(async (req, res) => {
	const { ids } = bulkDeleteSchema.parse(req.body);

	const deletedCategories = await bulkDeleteCategories(ids);

	appAssert(deletedCategories.count > 0, NOT_FOUND, "Categories not found");

	return res.status(OK).json({ message: "Categories deleted" });
});
