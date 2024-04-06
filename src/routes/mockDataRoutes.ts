import { Router } from "express";
import {DataController} from "../controllers/index";

const mockDataRouter = Router();

const dataController = new DataController();

mockDataRouter.get("/comments", dataController.getAllComments.bind(dataController));
mockDataRouter.get("/products", dataController.getAllProducts.bind(dataController));
mockDataRouter.get("/summaries", dataController.getAllSummaries.bind(dataController));

export default mockDataRouter;
