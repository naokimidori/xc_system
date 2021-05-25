import Router from '@koa/router'

import AuthController from './controllers/auth'
import UserController from './controllers/user'

const unprotectedRouter = new Router()

// auth相关的路由
unprotectedRouter.post('/auth/login', AuthController.login)
unprotectedRouter.post('/auth/register', AuthController.register)

const protectedRouter = new Router()

// user相关的路由
protectedRouter.get('/users', UserController.allUsers)
protectedRouter.get('/users/:id', UserController.showUserDetail)
protectedRouter.put('/users/:id', UserController.updateUser)
protectedRouter.delete('/user/:id', UserController.deleteUser)

export { unprotectedRouter, protectedRouter }
