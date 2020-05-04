import express from 'express'
import bodyParser from 'body-parser'
import { Application } from 'express'
import BaseController from '../controllers/BaseController'
import BaseMiddleware from '../middlewares/BaseMiddleware'
import ErrorMiddleware from '../middlewares/ErrorMiddleware'
import SigninController from '../controllers/SignController'


export default class App {

    public app: Application

    constructor(private controllers: BaseController[], private miidlewares: BaseMiddleware[]) {
        this.app = express()
        this.setupApp()
        this.setupSignin()
        this.setupControllers()
        // this.setupMiddlewares()
        this.setupErrorMiddleware()
    }

    setupApp() {
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
    }

    setupSignin() {
        const signinController = new SigninController()
        this.app.post('/signin', signinController.signin)
    }

    setupControllers() {
        this.controllers.forEach(element => {
            this.app.use(element.path, element.router)
        });
    }


    setupMiddlewares() {
        this.miidlewares.forEach(element => {
            this.app.use(element.func)
        });
    }

    setupErrorMiddleware() {
        this.app.use(new ErrorMiddleware().func)
    }
}