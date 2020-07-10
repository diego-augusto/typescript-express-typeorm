import { Router } from 'express'
import { SignupController } from '../controllers'

const router = Router()

router.post('/', SignupController.signup)

export default router