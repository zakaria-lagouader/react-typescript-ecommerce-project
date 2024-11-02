import { Router } from "express";
import {
	bulkDeleteCategoriesHandler,
	createCategoryHandler,
	deleteCategoryHandler,
	getCategoriesHandler,
	getCategoryHandler,
	updateCategoryHandler,
} from "@/controllers/category.controller";

export const categoryRoutes = Router();

// prefix: /category
categoryRoutes.get("/", getCategoriesHandler);
categoryRoutes.get("/:id", getCategoryHandler);
categoryRoutes.post("/", createCategoryHandler);
categoryRoutes.put("/:id", updateCategoryHandler);
categoryRoutes.delete("/:id", deleteCategoryHandler);
categoryRoutes.delete("/bulk-delete", bulkDeleteCategoriesHandler);
