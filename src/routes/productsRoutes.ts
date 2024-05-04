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
/* productRoutes.get("/averageRatingByCategory/:category", product.getAverageRatingByCategory.bind(product));
productRoutes.get("/commentCountByState/:state", product.getCommentCountByState.bind(product));  */
productRoutes.get("/averageRatingByState/:state/:productId", product.getAverageRatingByStateAndProduct.bind(product));
productRoutes.get("/getProductDemography/:productId/:date", product.getProductDemography.bind(product));


export default productRoutes;
