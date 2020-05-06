import BaseController from '../controllers/BaseController'
import ProductController from '../controllers/ProductController'
import StoreController from '../controllers/StoreController'
import UserController from '../controllers/UserController'
import App from './App'
import Database from './Database'

export default class Setup {

    static async setup() {

        await Database.getConnection()

        const controllers: BaseController[] = [
            new UserController(),
            new StoreController(),
            new ProductController()
        ]

        const app = new App(controllers).app

        return app
    }
}
