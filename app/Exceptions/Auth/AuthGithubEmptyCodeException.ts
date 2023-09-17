import { Exception } from '@adonisjs/core/build/standalone'

export default class AuthGithubEmptyCodeException extends Exception {
  constructor(message?: string) {
    const defaultMessage = 'Github code is empty'
    const status = 403
    const code = 'E_AUTH_GITHUB_EMPTY_CODE'

    super(message || defaultMessage, status, code)
  }
}
