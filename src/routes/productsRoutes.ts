import { Router } from "express";
import { ProductController } from "../controllers";

const productRoutes = Router();

const product = new ProductController();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Rotas para gerenciar produtos
 */

/**
 * @swagger
 * products/allProducts:
 *   get:
 *     summary: Retorna todos os produtos
 *     description: Retorna uma lista de todos os produtos.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos obtida com sucesso
 */
productRoutes.get("/allProducts", product.getAllProducts.bind(product));

/**
 * @swagger
 * products/byCategory/{category}:
 *   get:
 *     tags: [Products]
 *     summary: Retorna produtos por categoria
 *     description: Retorna uma lista de produtos com base na categoria fornecida.
 *     parameters:
 *       - name: category
 *         in: path
 *         required: true
 *         type: string
 *         description: Categoria dos produtos a serem retornados.
 *     responses:
 *       200:
 *         description: Lista de produtos obtida com sucesso por categoria
 */
productRoutes.get("/byCategory/:category", product.getProductsByCategory.bind(product));

/**
 * @swagger
 * products/bySubcategory/{subcategory}:
 *   get:
 *     tags: [Products]
 *     summary: Retorna produtos por subcategoria
 *     description: Retorna uma lista de produtos com base na subcategoria fornecida.
 *     parameters:
 *       - name: subcategory
 *         in: path
 *         required: true
 *         type: string
 *         description: Subcategoria dos produtos a serem retornados.
 *     responses:
 *       200:
 *         description: Lista de produtos obtida com sucesso por subcategoria
 */
productRoutes.get("/bySubcategory/:subcategory", product.getProductsBySubCategory.bind(product));

/**
 * @swagger
 * products/allProducts:
 *   delete:
 *     tags: [Products]
 *     summary: Deleta todos os produtos
 *     description: Remove todos os produtos do banco de dados.
 *     responses:
 *       200:
 *         description: Todos os produtos foram removidos com sucesso
 */
productRoutes.delete("/allProducts", product.deleteAllProducts.bind(product));

/**
 * @swagger
 * products/categories:
 *   get:
 *     tags: [Products]
 *     summary: Retorna categorias de produtos
 *     description: Retorna uma lista de todas as categorias de produtos disponíveis.
 *     responses:
 *       200:
 *         description: Lista de categorias de produtos obtida com sucesso
 */
productRoutes.get("/categories", product.getCategories.bind(product));

/**
 * @swagger
 * products/averageRating/{productId}:
 *   get:
 *     tags: [Products]
 *     summary: Retorna a classificação média do produto
 *     description: Retorna a classificação média de um produto com base no ID do produto fornecido.
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         type: string
 *         description: ID do produto para calcular a classificação média.
 *     responses:
 *       200:
 *         description: Classificação média do produto obtida com sucesso
 */
productRoutes.get("/averageRating/:productId", product.getProductAverageRating.bind(product));

/**
 * @swagger
 * products/averageRatingByState/{state}/{productId}:
 *   get:
 *     tags: [Products]
 *     summary: Retorna a classificação média do produto por estado
 *     description: Retorna a classificação média de um produto com base no ID do produto e no estado fornecidos.
 *     parameters:
 *       - name: state
 *         in: path
 *         required: true
 *         type: string
 *         description: Estado para filtrar a classificação média do produto.
 *       - name: productId
 *         in: path
 *         required: true
 *         type: string
 *         description: ID do produto para calcular a classificação média.
 *     responses:
 *       200:
 *         description: Classificação média do produto por estado obtida com sucesso
 */
productRoutes.get("/averageRatingByState/:state/:productId", product.getAverageRatingByStateAndProduct.bind(product));

/**
 * @swagger
 * products/getAllRecomendation/{productsUuid}:
 *   get:
 *     tags: [Products]
 *     summary: Retorna todas as recomendações
 *     description: Retorna uma lista de todas as recomendações para os produtos fornecidos.
 *     parameters:
 *       - name: productsUuid
 *         in: path
 *         required: true
 *         type: string
 *         description: UUIDs dos produtos para obter recomendações.
 *     responses:
 *       200:
 *         description: Lista de recomendações obtida com sucesso
 */
productRoutes.get("/getAllRecomendation/:productsUuid", product.getAllRecomendation.bind(product));

/**
 * @swagger
 * products/averageRatingByCategory/{category}:
 *   get:
 *     tags: [Products]
 *     summary: Retorna a classificação média do produto por categoria
 *     description: Retorna a classificação média de produtos com base na categoria fornecida.
 *     parameters:
 *       - name: category
 *         in: path
 *         required: true
 *         type: string
 *         description: Categoria dos produtos para calcular a classificação média.
 *     responses:
 *       200:
 *         description: Classificação média dos produtos por categoria obtida com sucesso
 */
productRoutes.get("/averageRatingByCategory/:category", product.getAverageRatingByCategory.bind(product));


export default productRoutes;
