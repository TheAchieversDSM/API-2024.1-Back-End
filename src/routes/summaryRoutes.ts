import { Router } from "express";
import SummaryController from "../controllers/summaryController";

const summaryRoutes = Router();

const summaryController = new SummaryController();

/**
 * @swagger
 * tags:
 *   name: Summary
 *   description: Rotas para gerenciar produtos
 */

/**
 * @swagger
 * summary/getAllByCategories/{type}/{categories}:
 *   get:
 *     tags: [Summary]
 *     summary: Retorna todos os resumos por categorias
 *     description: Retorna uma lista de todos os resumos com base no tipo e nas categorias fornecidas.
 *     parameters:
 *       - name: type
 *         in: path
 *         required: true
 *         type: string
 *         description: Tipo dos resumos a serem retornados.
 *       - name: categories
 *         in: path
 *         required: true
 *         type: string
 *         description: Categorias dos resumos a serem retornados.
 *     responses:
 *       200:
 *         description: Lista de resumos obtida com sucesso por categorias
 */
summaryRoutes.get("/getAllByCategories/:type/:categories", summaryController.getAllSummariesByCategories.bind(summaryController));

/**
 * @swagger
 * summary/getAllByProduct/{productsUuid}:
 *   get:
 *     tags: [Summary]
 *     summary: Retorna todos os resumos por produto
 *     description: Retorna uma lista de todos os resumos para o produto fornecido.
 *     parameters:
 *       - name: productsUuid
 *         in: path
 *         required: true
 *         type: string
 *         description: UUID do produto para obter resumos.
 *     responses:
 *       200:
 *         description: Lista de resumos obtida com sucesso por produto
 */
summaryRoutes.get("/getAllByProduct/:productsUuid", summaryController.getAllSummariesByProduct.bind(summaryController));

export default summaryRoutes;
