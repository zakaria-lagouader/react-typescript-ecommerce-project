import { Router } from "express";
import {
	bulkDeleteBrandsHandler,
	createBrandHandler,
	deleteBrandHandler,
	getBrandsHandler,
	getBrandHandler,
	updateBrandHandler,
} from "@/controllers/brand.controller";

export const brandRoutes = Router();

// prefix: /brand
brandRoutes.get("/", getBrandsHandler);
brandRoutes.get("/:id", getBrandHandler);
brandRoutes.post("/", createBrandHandler);
brandRoutes.put("/:id", updateBrandHandler);
brandRoutes.delete("/:id", deleteBrandHandler);
brandRoutes.post("/bulk-delete", bulkDeleteBrandsHandler);
