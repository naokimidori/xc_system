import 'reflect-metadata'
import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import { createConnection } from 'typeorm'
import jwt from 'koa-jwt'

import { logger } from './logger'
import { unprotectedRouter, protectedRouter } from './routes'
import { JWT_SECRET } from './constant'

createConnection()
  .then(() => {
    const app = new Koa()

    app.use(logger())
    app.use(cors())
    app.use(bodyParser())

    // 无需JWT即可访问
    app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods())

    // 注册JWT中间件
    app.use(jwt({ secret: JWT_SECRET }).unless({ method: 'GET' }))

    // 需JWT才能访问
    app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods())

    app.listen(3000)
  })
  .catch((err: string) => {
    console.log('TypeORM connection error', err)
  })
