import { Router } from "express";
import mockDataRouter from "./mockDataRoutes";
import baseImportRoutes from "./baseImportRoutes";

const router = Router();

router.use("/data", mockDataRouter);
router.use("/base-importer", baseImportRoutes)

export default router;