import { Router } from "express";
import mockDataRouter from "./mockDataRoutes";
import baseImportRoutes from "./baseImportRoutes";
import productRoutes from "./productsRoutes";

const router = Router();

router.use("/data", mockDataRouter);
router.use("/base-importer", baseImportRoutes)
router.use("/products", productRoutes)

export default router;