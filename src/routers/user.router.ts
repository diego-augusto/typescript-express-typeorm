import { Router } from 'express'
import * as UserController from '../controllers/UserController'

const router = Router()

router.get('/', UserController.getAll)
router.get('/:id', UserController.getOne)
router.put('/:id', UserController.edit)
router.delete('/:id', UserController.remove)

export default router