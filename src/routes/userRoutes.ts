import { Router } from "express";
import { UserController }from "../controllers/index";

const userRoutes = Router();

userRoutes.post("/signup", UserController.createUser.bind(UserController));
userRoutes.post("/login", UserController.loginUser.bind(UserController));

export default userRoutes;
