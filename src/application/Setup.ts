import App from './App'
import UserController from "../controllers/UserController";
import BaseController from "../controllers/BaseController";
import Database from './Database';

export default class Setup {

    static async setup() {

        await Database.getConnection();
        
        const controllers: BaseController[] = [
            new UserController(),
        ]

        // const miiddlewares: BaseMiddleware[] = [
        //     new LoggerMiddleware(),
        // ]

        const app = new App(controllers).app

        return app
    }
}




