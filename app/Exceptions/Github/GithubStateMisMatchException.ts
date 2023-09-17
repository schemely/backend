import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@adonisjs/core/build/standalone'

export default class GithubStateMisMatchException extends Exception {
  constructor(message?: string) {
    const defaultMessage = 'Request expired. Retry again'
    const status = 403
    const code = 'E_GITHUB_STATE_MIS_MATCH'

    super(message || defaultMessage, status, code)

    this.message = message || defaultMessage
  }

  public async handle(error: this, ctx: HttpContextContract) {
    ctx.response.status(error.status).send({ errors: [{ message: error.message }] })
  }
}
