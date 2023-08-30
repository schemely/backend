import { Exception } from '@adonisjs/core/build/standalone'

export default class GithubAccessDeniedException extends Exception {
  constructor(message?: string) {
    const defaultMessage = 'Access was denied'
    const status = 401
    const code = 'E_GITHUB_ACCESS_DENIED'

    super(message || defaultMessage, status, code)
  }
}
