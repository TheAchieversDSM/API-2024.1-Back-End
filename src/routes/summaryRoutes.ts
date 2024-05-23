import { Router } from "express";
import SummaryController from "../controllers/summaryController";

const summaryRoutes = Router();

const summaryController = new SummaryController();

summaryRoutes.get("/getAllByCategories/:type/:categories", summaryController.getAllSummariesByCategories.bind(summaryController));
summaryRoutes.get("/getAllByProduct/:productsUuid", summaryController.getAllSummariesByProduct.bind(summaryController));

export default summaryRoutes;
