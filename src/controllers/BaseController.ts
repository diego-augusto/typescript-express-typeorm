import { Router } from 'express'

export default class BaseController {

    protected router: Router
    protected path: string

    constructor(path: string) {
        this.router = Router()
        this.path = path
    }
}