import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Project from 'App/Models/Project'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public avatar_url: string

  @column()
  public github_id: number

  @column()
  public github_login: string

  @column({ serializeAs: null })
  public github_code: string

  @column()
  public github_token: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public remember_me_token: string | null

  @hasMany(() => Project)
  public projects: HasMany<typeof Project>

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
