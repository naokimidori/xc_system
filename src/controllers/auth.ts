import { Context } from 'koa'
import * as argon2 from 'argon2'
import { getManager } from 'typeorm'
import jwt from 'jsonwebtoken'

import { User } from '../entity/user'
import { JWT_SECRET } from '../constant'
export default class AuthController {
  public static async login(ctx: Context) {
    const userRepository = getManager().getRepository(User)

    const user = await userRepository
      .createQueryBuilder()
      .where({ name: ctx.request.body.name })
      .addSelect('User.password')
      .getOne()

    if (!user) {
      ctx.status = 401
      ctx.body = { message: '用户名不存在' }
    } else if (await argon2.verify(user.password, ctx.request.body.password)) {
      ctx.status = 200
      ctx.body = { token: jwt.sign({ id: user.id }, JWT_SECRET) }
    } else {
      ctx.status = 401
      ctx.body = { message: '密码错误' }
    }
  }

  public static async register(ctx: Context) {
    const userRepository = getManager().getRepository(User)
    const newUer = new User()
    newUer.name = ctx.request.body.name
    newUer.email = ctx.request.body.email
    newUer.password = await argon2.hash(ctx.request.body.password)

    const user = await userRepository.save(newUer)

    ctx.status = 201
    ctx.body = user
  }
}
