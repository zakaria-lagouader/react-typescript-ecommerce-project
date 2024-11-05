import { CREATED, NOT_FOUND, OK } from "@/constants/http";
import { bulkDeleteSchema } from "@/schemas/bulk-delete";
import { productSchema } from "@/schemas/product.schema";
import {
	bulkDeleteProducts,
	createProduct,
	deleteProductById,
	getAllProducts,
	getProductById,
	updateProductById,
} from "@/services/product.service";
import appAssert from "@/utils/app-assert";
import catchErrors from "@/utils/catch-errors";

export const getProductsHandler = catchErrors(async (req, res) => {
	const products = await getAllProducts();

	return res.status(OK).json(products);
});

export const getProductHandler = catchErrors(async (req, res) => {
	const { id } = req.params;
	const product = await getProductById(id);

	appAssert(product, NOT_FOUND, "Product not found");

	return res.status(OK).json(product);
});

export const createProductHandler = catchErrors(async (req, res) => {
	// if (!req.files || Object.keys(req.files).length === 0) {
	// 	return res.status(400).json({ message: 'No files were uploaded.' });
	//   }

	//   const uploadedFiles = req.files.files;
	//   const uploadResults: string[] = [];

	//   // Handle both single file and multiple files
	//   const files = Array.isArray(uploadedFiles) ? uploadedFiles : [uploadedFiles];

	//   // Process each file
	//   for (const file of files) {
	// 	const uploadPath = path.join(__dirname, 'uploads', file.name);

	// 	// Move file to uploads directory
	// 	await file.mv(uploadPath);

	// 	uploadResults.push(file.name);
	//   }
	return res.status(OK).json({ req });

	const request = productSchema.parse(req.body);

	const product = await createProduct(request);

	return res.status(CREATED).json(product);
});

export const updateProductHandler = catchErrors(async (req, res) => {
	const { id } = req.params;
	const request = productSchema.parse(req.body);

	const updatedProduct = await updateProductById(id, request);

	appAssert(updatedProduct, NOT_FOUND, "Product not found");

	return res.status(OK).json(updatedProduct);
});

export const deleteProductHandler = catchErrors(async (req, res) => {
	const { id } = req.params;
	const deletedProduct = await deleteProductById(id);

	appAssert(deletedProduct, NOT_FOUND, "Product not found");

	return res.status(OK).json({ message: "Product deleted" });
});

export const bulkDeleteProductsHandler = catchErrors(async (req, res) => {
	const { ids } = bulkDeleteSchema.parse(req.body);

	const deletedProducts = await bulkDeleteProducts(ids);

	appAssert(deletedProducts.count > 0, NOT_FOUND, "Products not found");

	return res.status(OK).json({ message: "Products deleted" });
});
