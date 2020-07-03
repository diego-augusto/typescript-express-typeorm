import App from './App'
import Database from './Database'

export default class Setup {

    static async setup() {
        await Database.getConnection()
        const app = new App().app
        return app
    }
}
