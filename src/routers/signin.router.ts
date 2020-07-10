import { Router } from 'express'
import { AuthController } from '../controllers'

const router = Router()

router.post('/', AuthController.signin)

export default router