import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'


const app = new Koa()

app.use(cors())
app.use(bodyParser())

app.use((ctx) => {
  ctx.body = 'hello vino~'
})

app.listen(3000, () => {
  console.log(`Server Start At http://localhost:3000/`)
})
