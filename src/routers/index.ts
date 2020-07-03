import { Router } from 'express'
import AuthenticationMiddleware from '../middlewares/AuthenticationMiddleware'
import ErrorMiddleware from '../middlewares/ErrorMiddleware'
import ProduRouter from '../routers/product.router'
import SigninRouter from '../routers/signin.router'
import SignupRouter from '../routers/signup.router'
import StoreRouter from '../routers/store.router'
import UserRouter from '../routers/user.router'

const routes = Router()

routes.use('/signup', SignupRouter)
routes.use('/signin', SigninRouter)

routes.use(AuthenticationMiddleware)

routes.use('/users', UserRouter)
routes.use('/stores', StoreRouter)
routes.use('/products', ProduRouter)

routes.use(ErrorMiddleware)

export default routes