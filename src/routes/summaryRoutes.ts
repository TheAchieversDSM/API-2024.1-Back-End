import { Router } from "express";
import SummaryController from "../controllers/summaryController";

const summaryRoutes = Router();

const summaryController = new SummaryController();

summaryRoutes.get("/getAllByCategories/:type/:categories", summaryController.getAllSummariesByCategories.bind(summaryController));

export default summaryRoutes;