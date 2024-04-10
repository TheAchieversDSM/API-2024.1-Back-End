import { Router } from "express";
import { ProductController } from "../controllers";

const productRoutes = Router();

const product = new ProductController();

productRoutes.get("/allProducts", product.getAllProducts.bind(product));
productRoutes.get("/byCategory/:category", product.getProductsByCategory.bind(product));
productRoutes.get("/bySubcategory/:subcategory", product.getProductsBySubCategory.bind(product));
productRoutes.delete("/allProducts", product.deleteAllProducts.bind(product));
productRoutes.get("/categories", product.getCategories.bind(product));
productRoutes.get("/averageRating/:productId", product.getProductAverageRating.bind(product));

export default productRoutes;
