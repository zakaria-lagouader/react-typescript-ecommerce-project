import { CREATED, NOT_FOUND, OK } from "@/constants/http";
import { bulkDeleteSchema } from "@/schemas/bulk-delete";
import { brandSchema } from "@/schemas/brand.schema";
import {
	bulkDeleteBrands,
	createBrand,
	deleteBrandById,
	getAllBrands,
	getBrandById,
	updateBrandById,
} from "@/services/brand.service";
import appAssert from "@/utils/app-assert";
import catchErrors from "@/utils/catch-errors";

export const getBrandsHandler = catchErrors(async (req, res) => {
	const brands = await getAllBrands();

	return res.status(OK).json(brands);
});

export const getBrandHandler = catchErrors(async (req, res) => {
	const { id } = req.params;
	const brand = await getBrandById(id);

	appAssert(brand, NOT_FOUND, "Brand not found");

	return res.status(OK).json(brand);
});

export const createBrandHandler = catchErrors(async (req, res) => {
	const request = brandSchema.parse(req.body);

	const brand = await createBrand(request);

	return res.status(CREATED).json(brand);
});

export const updateBrandHandler = catchErrors(async (req, res) => {
	const { id } = req.params;
	const request = brandSchema.parse(req.body);

	const updatedBrand = await updateBrandById(id, request);

	appAssert(updatedBrand, NOT_FOUND, "Brand not found");

	return res.status(OK).json(updatedBrand);
});

export const deleteBrandHandler = catchErrors(async (req, res) => {
	const { id } = req.params;
	const deletedBrand = await deleteBrandById(id);

	appAssert(deletedBrand, NOT_FOUND, "Brand not found");

	return res.status(OK).json({ message: "Brand deleted" });
});

export const bulkDeleteBrandsHandler = catchErrors(async (req, res) => {
	const { ids } = bulkDeleteSchema.parse(req.body);

	const deletedBrands = await bulkDeleteBrands(ids);

	appAssert(deletedBrands.count > 0, NOT_FOUND, "Brands not found");

	return res.status(OK).json({ message: "Brands deleted" });
});
