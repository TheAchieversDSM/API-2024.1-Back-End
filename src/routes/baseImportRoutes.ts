import { Router } from "express";
import { BaseImportController } from "../controllers";

const baseImportRoutes = Router();

const baseImport = new BaseImportController();

baseImportRoutes.post("/import", baseImport.uploadFile.bind(baseImport));
baseImportRoutes.get("/allBases", baseImport.getImportLogs.bind(baseImport));

export default baseImportRoutes;
