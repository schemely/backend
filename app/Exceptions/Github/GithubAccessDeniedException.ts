import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@adonisjs/core/build/standalone'

export default class GithubAccessDeniedException extends Exception {
  constructor(message?: string) {
    const defaultMessage = 'Access was denied'
    const status = 401
    const code = 'E_GITHUB_ACCESS_DENIED'

    super(message || defaultMessage, status, code)

    this.message = message || defaultMessage
  }

  public async handle(error: this, ctx: HttpContextContract) {
    ctx.response.status(error.status).send({ errors: [{ message: error.message }] })
  }
}
