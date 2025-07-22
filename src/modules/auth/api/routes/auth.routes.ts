import { Router } from "express";
//import { container } from "../../../../ioc/dependency-container";
import { ILoginControllerToken, ILoginController } from "../controllers/login-controller.interface";
import { dependencyContainer } from "src/ioc/dependency-container";

const authRoutes = Router();

const loginController = dependencyContainer.resolve<ILoginController>(ILoginControllerToken);

authRoutes.post('/login', loginController.login.bind(loginController));

export default authRoutes;