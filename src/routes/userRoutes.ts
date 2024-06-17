import { Router } from "express";
import { UserController } from "../controllers/index";

const userRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Rotas para gerenciar usários
 */

/**
 * @swagger
 * users/signup:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Rota para criar um novo usuário.
 *     tags: [User] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro ao criar usuário
 */
userRoutes.post("/signup", UserController.createUser.bind(UserController));

/**
 * @swagger
 * users/login:
 *   post:
 *     summary: Autentica um usuário
 *     description: Rota para autenticar um usuário.
 *     tags: [User] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginCredentials'
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
userRoutes.post("/login", UserController.loginUser.bind(UserController));

export default userRoutes;
