import App from './App'
import UserController from "../controllers/UserController";
import BaseController from "../controllers/BaseController";
import Database from './Database';
import StoreController from '../controllers/StoreController';
import ProductController from '../controllers/ProductController';

export default class Setup {

    static async setup() {

        await Database.getConnection();

        const controllers: BaseController[] = [
            new UserController(),
            new StoreController(),
            new ProductController()
        ]

        const app = new App(controllers).app

        return app
    }
}




