import { Router } from 'express'
import { AuthController } from '../controllers'

const router = Router()

router.post('/', AuthController.signup)

export default router