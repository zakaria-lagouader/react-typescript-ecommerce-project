import { Router } from "express";
import {
	bulkDeleteProductsHandler,
	createProductHandler,
	deleteProductHandler,
	getProductsHandler,
	getProductHandler,
	updateProductHandler,
} from "@/controllers/product.controller";

export const productRoutes = Router();

// prefix: /product
productRoutes.get("/", getProductsHandler);
productRoutes.get("/:id", getProductHandler);
productRoutes.post("/", createProductHandler);
productRoutes.put("/:id", updateProductHandler);
productRoutes.delete("/:id", deleteProductHandler);
productRoutes.post("/bulk-delete", bulkDeleteProductsHandler);
