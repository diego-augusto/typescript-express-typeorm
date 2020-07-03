import bodyParser from 'body-parser'
import express from 'express'
import { Application } from 'express'
import BaseController from '../controllers/BaseController'
import Router from '../routers'

export default class App {

    public app: Application

    constructor() {
        this.app = express()
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
        this.app.use(Router)
    }
}