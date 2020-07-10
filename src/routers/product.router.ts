import { Router } from 'express'
import {ProductController} from '../controllers'

const router = Router()

router.get('/', ProductController.getAll)
router.get('/:id', ProductController.getOne)
router.post('/:id', ProductController.add)
router.put('/:id', ProductController.edit)
router.delete('/:id', ProductController.remove)

export default router