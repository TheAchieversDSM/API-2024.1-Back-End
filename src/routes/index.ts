import { Router } from "express";
import baseImportRoutes from "./baseImportRoutes";
import productRoutes from "./productsRoutes";

const router = Router();

router.use("/base-importer", baseImportRoutes)
router.use("/products", productRoutes)

export default router;