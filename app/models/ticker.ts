import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Ticker extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare symbol: string

  @column()
  declare name: string | null

  @column()
  declare segment: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
