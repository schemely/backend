import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'

export default class SlugAvailableValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    slug: schema.string({ trim: true }, [rules.maxLength(50), rules.regex(/^[a-z0-9\-]+$/)]),
  })

  public messages: CustomMessages = {}
}
