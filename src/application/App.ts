import express from 'express'
import bodyParser from 'body-parser'
import { Application } from 'express'
import BaseController from '../controllers/BaseController'
import BaseMiddleware from '../middlewares/BaseMiddleware'

export default class App {

    public app: Application

    constructor(private controllers: BaseController[], private miidlewares: BaseMiddleware[]) {
        this.app = express()
        this.setupMiddlewares()
        this.setupControllers()
    }

    setupControllers() {
        this.controllers.forEach(element => {
            this.app.use(element.path, element.router)
        });
    }

    setupMiddlewares() {

        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())

        this.miidlewares.forEach(element => {
            this.app.use(element.func)
        });
    }
}