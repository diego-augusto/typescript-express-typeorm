import { Router } from 'express'
import { SigninControler } from '../controllers'

const router = Router()

router.post('/', SigninControler.signin)

export default router