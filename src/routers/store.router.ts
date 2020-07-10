import { Router } from 'express'
import { StoreController } from '../controllers'

const router = Router()

router.get('/', StoreController.getAll)
router.get('/:id', StoreController.getOne)
router.post('/:id', StoreController.add)
router.put('/:id', StoreController.edit)
router.delete('/:id', StoreController.remove)

export default router