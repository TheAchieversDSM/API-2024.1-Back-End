import { Router } from "express";
import { BaseImportController } from "../controllers";

const baseImportRoutes = Router();

const baseImport = new BaseImportController();

/**
 * @swagger
 * tags:
 *   name: Imports
 *   description: Rotas para gerenciar uploads dos arquivos
 */

/**
 * @swagger
 * base-importer/import:
 *   post:
 *     tags: [Imports]
 *     summary: Importa um arquivo CSV
 *     description: Rota para importar um arquivo CSV para processamento.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: file
 *         in: formData
 *         required: true
 *         type: file
 *         description: O arquivo CSV a ser importado.
 *     responses:
 *       200:
 *         description: Arquivo CSV importado com sucesso
 *       400:
 *         description: Erro ao importar arquivo CSV
 */
baseImportRoutes.post("/import", baseImport.uploadFile.bind(baseImport));

/**
 * @swagger
 * base-importer/allBases:
 *   get:
 *     tags: [Imports]
 *     summary: Obtém todos os logs de importação
 *     description: Rota para obter todos os logs de importação.
 *     responses:
 *       200:
 *         description: Lista de logs de importação obtida com sucesso
 *       400:
 *         description: Erro ao obter lista de logs de importação
 */
baseImportRoutes.get("/allBases", baseImport.getImportLogs.bind(baseImport));

export default baseImportRoutes;
