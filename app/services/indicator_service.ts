import Database from '@adonisjs/lucid/services/db'
import StockFundamentalIndicator from '#models/stock_fundamental_indicator'
import fs from 'fs'

export class IndicatorService {
  async logs() {
    const logs = await fs.promises.readFile('./coletor.log', 'utf-8')
    return logs
  }

  async stocks() {
    const indicators = await StockFundamentalIndicator.query()
      .joinRaw(
        `join (select ticker_id, max(created_at) as created_at from stock_fundamental_indicators group by ticker_id) as latest on stock_fundamental_indicators.ticker_id = latest.ticker_id and stock_fundamental_indicators.created_at = latest.created_at`
      )
      .select('stock_fundamental_indicators.*')

    return indicators
  }
}
