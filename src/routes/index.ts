import { Router } from "express";
import mockDataRouter from "./mockDataRoutes";

const router = Router();

router.use("/data", mockDataRouter);

export default router;