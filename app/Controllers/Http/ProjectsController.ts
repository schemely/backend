import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Project from 'App/Models/Project'
import CreateProjectValidator from 'App/Validators/Project/CreateProjectValidator'
import SlugAvailableValidator from 'App/Validators/Project/SlugAvailableValidator'

export default class ProjectsController {
  /**
   * All visible projects
   */
  public async index({}: HttpContextContract) {
    return await Project.query().where('is_visible', true)
  }

  /**
   * A visible project by id
   */
  public async show({ params }: HttpContextContract) {
    return await Project.query().where('id', params.id).where('is_visible', true).firstOrFail()
  }

  /**
   * Create project
   */
  public async store({ request, auth }: HttpContextContract) {
    const payload = await request.validate(CreateProjectValidator)

    const project = await Project.create({
      ...payload,
      owner_id: auth.user?.id,
    })

    return project
  }

  public async patch({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}

  /**
   * Is slug available
   */
  public async isSlugAvailable({ request }: HttpContextContract) {
    const { slug } = await request.validate(SlugAvailableValidator)
    const project = await Project.findBy('slug', slug)
    return { available: project ? false : true }
  }
}
