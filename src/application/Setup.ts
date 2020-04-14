import App from './App'
import UserController from "../controllers/UserController";
import BaseController from "../controllers/BaseController";
import LoggerMiddleware from "../middlewares/LoggerMiddeware";
import BaseMiddleware from "../middlewares/BaseMiddleware";

const controllers : BaseController[] = [
    new UserController(),
]

const miiddlewares : BaseMiddleware[] = [
    new LoggerMiddleware(),
]

const app = new App(controllers, miiddlewares).app

export default app;