/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.where('id', Route.matchers.number())

Route.group(() => {
  /**
   * Auth
   */
  Route.group(() => {
    Route.get('github/redirect', 'AuthController.githubRedirect').as('auth.github.redirect')
    Route.get('github/callback', 'AuthController.githubCallback').as('auth.github.callback')
    Route.post('login', 'AuthController.login').as('auth.login')
    Route.get('logout', 'AuthController.logout').as('auth.logout')
    Route.get('user', 'AuthController.user').as('auth.user').middleware('auth')
  }).prefix('auth')

  /**
   * Project
   */
  Route.get('/projects', 'ProjectsController.index').as('project.index')
  Route.get('/projects/:id', 'ProjectsController.show').as('project.show')
  Route.post('/projects', 'ProjectsController.store').as('project.store').middleware('auth')
  Route.get('/projects/slug-available', 'ProjectsController.isSlugAvailable').as(
    'project.isSlugAvailable'
  )
}).prefix('api')
