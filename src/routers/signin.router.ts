import { Router } from 'express'
import * as AuthController from '../controllers/AuthController'

const router = Router()

router.post('/', AuthController.signin)

export default router