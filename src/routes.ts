import Router from '@koa/router'

import AuthController from './controllers/auth'
import UserController from './controllers/user'

const router = new Router()

// auth相关的路由
router.post('/auth/login', AuthController.login)
router.post('/auth/register', AuthController.register)

// user相关的路由
router.get('/users', UserController.allUsers)
router.get('/users/:id', UserController.showUserDetail)
router.put('/users/:id', UserController.updateUser)
router.delete('/user/:id', UserController.deleteUser)

export default router
