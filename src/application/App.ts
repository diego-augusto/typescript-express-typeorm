import express from 'express'
import bodyParser from 'body-parser'
import { Application } from 'express'
import BaseController from '../controllers/BaseController'
import BaseMiddleware from '../middlewares/BaseMiddleware'
import ErrorMiddleware from '../middlewares/ErrorMiddleware'
import AuthController from '../controllers/AuthController'

export default class App {

    public app: Application

    constructor(private controllers: BaseController[], private miidlewares?: BaseMiddleware[]) {
        this.app = express()
        this.setupApp()
        this.setupAuth()
        this.setupControllers()
        this.setupErrorMiddleware()
    }

    setupApp() {
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
    }

    setupAuth() {
        const authController = new AuthController()
        this.app.post('/signin', authController.signin)
        this.app.post('/signup', authController.signup)
    }

    setupControllers() {
        this.controllers.forEach(element => {
            this.app.use(element.path, element.router)
        });
    }

    setupMiddlewares() {
        if(this.miidlewares){
            this.miidlewares.forEach(element => {
                this.app.use(element.func)
            });
        }
    }

    setupErrorMiddleware() {
        this.app.use(new ErrorMiddleware().func)
    }
}