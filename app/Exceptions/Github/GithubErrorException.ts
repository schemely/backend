import { Exception } from '@adonisjs/core/build/standalone'

export default class GithubErrorException extends Exception {
  constructor(message?: string | null) {
    const defaultMessage = 'Github error'
    const status = 403
    const code = 'E_GITHUB_ERROR'

    super(message || defaultMessage, status, code)
  }
}
