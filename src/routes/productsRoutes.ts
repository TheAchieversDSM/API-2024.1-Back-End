import { Router } from "express";
import { ProductController } from "../controllers";

const productRoutes = Router();

const product = new ProductController();

productRoutes.get("/allProducts", product.getAllProducts.bind(product));
productRoutes.get("/byCategory/:category", product.getProductsByCategory.bind(product));
productRoutes.get("/bySubcategory/:subcategory", product.getProductsBySubCategory.bind(product));
productRoutes.delete("/allProducts", product.deleteAllProducts.bind(product));

export default productRoutes;
