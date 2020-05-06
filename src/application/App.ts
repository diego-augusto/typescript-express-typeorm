import bodyParser from 'body-parser'
import express from 'express'
import { Application } from 'express'
import AuthController from '../controllers/AuthController'
import BaseController from '../controllers/BaseController'
import AuthenticationMiddleware from '../middlewares/AuthenticationMiddleware'
import ErrorMiddleware from '../middlewares/ErrorMiddleware'

export default class App {

    public app: Application

    constructor(private controllers: BaseController[]) {
        this.app = express()
        this.setupApp()
        this.setupAuthentication()
        this.setupControllers()
        this.setupErrorMiddleware()
    }

    setupApp() {
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
    }

    setupAuthentication() {
        const authController = new AuthController()
        this.app.post('/signin', authController.signin)
        this.app.post('/signup', authController.signup)
        this.app.use(AuthenticationMiddleware)
    }

    setupControllers() {
        this.controllers.forEach(element => {
            this.app.use(element.path, element.router)
        })
    }

    setupErrorMiddleware() {
        this.app.use(ErrorMiddleware)
    }
}