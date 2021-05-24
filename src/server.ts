import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import { logger } from './logger'
import router from './routes'

const app = new Koa()

app.use(logger())
app.use(cors())
app.use(bodyParser())

// 响应用户请求
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)
