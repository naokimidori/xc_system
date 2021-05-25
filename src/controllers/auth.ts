import { Context } from 'koa'
import * as argon2 from 'argon2'
import { getManager } from 'typeorm'

import { User } from '../entity/user'
export default class AuthController {
  public static async login(ctx: Context) {
    ctx.body = 'Login Controller'
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
