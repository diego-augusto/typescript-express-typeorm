import { Router } from 'express'

export default class BaseController {

    public router: Router
    public path: string

    constructor(path: string) {
        this.router = Router()
        this.path = path
    }
}