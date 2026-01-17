import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Ticker from './ticker.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class StockFundamentalIndicator extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tickerId: number

  @column()
  declare price: number | null

  @column()
  declare peRatio: number | null

  @column()
  declare pbRatio: number | null

  @column()
  declare psRatio: number | null

  @column()
  declare dividendYield: number | null

  @column()
  declare priceToAssets: number | null

  @column()
  declare priceToWorkingCapital: number | null

  @column()
  declare priceToEbit: number | null

  @column()
  declare priceToCurrentAssets: number | null

  @column()
  declare evToEbit: number | null

  @column()
  declare evToEbitda: number | null

  @column()
  declare ebitMargin: number | null

  @column()
  declare netMargin: number | null

  @column()
  declare currentRatio: number | null

  @column()
  declare roic: number | null

  @column()
  declare roe: number | null

  @column()
  declare avgLiquidity2Months: number | null

  @column()
  declare netEquity: number | null

  @column()
  declare grossDebtToEquity: number | null

  @column({ columnName: 'revenue_growth_5y' })
  declare revenueGrowth5y: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Ticker)
  declare ticker: BelongsTo<typeof Ticker>
}
