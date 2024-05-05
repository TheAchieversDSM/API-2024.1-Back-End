import { Router } from "express";
import baseImportRoutes from "./baseImportRoutes";
import productRoutes from "./productsRoutes";
import summaryRoutes from "./summaryRoutes";
import userRoutes from "./userRoutes";

const router = Router();

router.use("/base-importer", baseImportRoutes)
router.use("/products", productRoutes)
router.use("/summary", summaryRoutes)
router.use("/users", userRoutes);

export default router;