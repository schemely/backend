import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User'

export default class AuthController {
  /**
   * Github Redirect
   */
  public async githubRedirect({ ally }: HttpContextContract) {
    return ally.use('github').redirect()
  }

  /**
   * Github Callback
   */
  public async githubCallback({ request, response, ally }: HttpContextContract) {
    const github = ally.use('github')

    if (github.accessDenied()) {
      return { message: 'Access was denied' }
    }

    if (github.stateMisMatch()) {
      return { message: 'Request expired. Retry again' }
    }

    if (github.hasError()) {
      return github.getError()
    }

    const githubUser = await github.user()

    const data = {
      email: githubUser.email ?? '',
      avatar_url: githubUser.avatarUrl ?? '',
      github_id: parseInt(githubUser.id),
      github_login: githubUser.original.login ?? '',
      github_code: request.qs().code ?? '',
      github_token: githubUser.token.token,
    }

    const user = await User.findBy('github_id', data.github_id)
    if (user) {
      user.merge(data)
      await user.save()
    } else {
      await User.create(data)
    }

    return response
      .redirect()
      .withQs({ code: data.github_code })
      .toPath(Env.get('GITHUB_TO_LOCAL_AUTH_URL'))
  }

  /**
   * Login
   */
  public async login({ request, auth }: HttpContextContract) {
    const code = request.input('code')

    if (code === undefined) {
      throw new Error('Github code is empty.')
    }

    const user = await User.findByOrFail('github_code', code)
    user.github_code = ''
    await user.save()

    const token = await auth.use('api').generate(user, { expiresIn: '1day' })

    return { token: token.token }
  }

  /**
   * Logout
   */
  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
  }

  /**
   * User
   */
  public user({ auth }: HttpContextContract) {
    return auth.use('api').user
  }
}
