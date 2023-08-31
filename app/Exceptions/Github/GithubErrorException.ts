import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@adonisjs/core/build/standalone'

export default class GithubErrorException extends Exception {
  constructor(message?: string | null) {
    const defaultMessage = 'Github error'
    const status = 403
    const code = 'E_GITHUB_ERROR'

    super(message || defaultMessage, status, code)

    this.message = message || defaultMessage
  }

  public async handle(error: this, ctx: HttpContextContract) {
    ctx.response.status(error.status).send({ errors: [{ message: error.message }] })
  }
}
