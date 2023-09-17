import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'

export default class CreateProjectValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.maxLength(50)]),
    slug: schema.string({ trim: true }, [
      rules.maxLength(50),
      rules.regex(/^[a-z0-9\-]+$/),
      rules.unique({ table: 'projects', column: 'slug' }),
    ]),
    description_short: schema.string.nullableAndOptional({ trim: true }, [rules.maxLength(255)]),
    description: schema.string.nullableAndOptional({ trim: true }),
    is_visible: schema.boolean.optional(),
  })

  public messages: CustomMessages = {}
}
