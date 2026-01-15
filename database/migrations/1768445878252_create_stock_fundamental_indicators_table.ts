import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'stock_fundamental_indicators'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('ticker_id').unsigned().notNullable().comment('Foreign key referencing the tickers table.')
      table.foreign('ticker_id').references('id').inTable('tickers')
      table.decimal('price', 10, 2).comment('Current stock price of the company.')
      table.decimal('pe_ratio', 10, 2).comment('Price-to-Earnings ratio indicating the company\'s current share price relative to its per-share earnings.')
      table.decimal('pb_ratio', 10, 2).comment('Price-to-Book ratio comparing the market value of a company to its book value.')
      table.decimal('ps_ratio', 10, 4).comment('Price-to-Sales ratio measuring the company\'s stock price relative to its revenues.')
      table.decimal('dividend_yield', 10, 5).comment('Dividend yield representing the dividend income relative to the stock price.')
      table.decimal('price_to_assets', 10, 5).comment('Price to Assets ratio indicating how much investors are paying for each dollar of a company\'s assets.')
      table.decimal('price_to_working_capital', 10, 2).comment('Price to Working Capital ratio measuring the stock price against the company\'s working capital.')
      table.decimal('price_to_ebit', 10, 2).comment('Price to EBIT ratio comparing the stock price to earnings before interest and taxes.')
      table.decimal('price_to_current_assets', 10, 2).comment('Price to Current Assets ratio indicating the stock price relative to the company\'s current assets.')
      table.decimal('ev_to_ebit', 10, 2).comment('Enterprise Value to EBIT ratio measuring the company\'s total value compared to its earnings before interest and taxes.')
      table.decimal('ev_to_ebitda', 10, 2).comment('Enterprise Value to EBITDA ratio comparing the company\'s total value to its earnings before interest, taxes, depreciation, and amortization.')
      table.decimal('ebit_margin', 10, 5).comment('EBIT Margin representing the company\'s earnings before interest and taxes as a percentage of its revenue.')
      table.decimal('net_margin', 10, 5).comment('Net Margin indicating the percentage of revenue that remains as profit after all expenses are deducted.')
      table.decimal('current_ratio', 5, 2).comment('Current Ratio assessing the company\'s ability to pay short-term obligations with its current assets.')
      table.decimal('roic', 10, 5).comment('Return on Invested Capital measuring the company\'s efficiency at allocating the capital under its control to profitable investments.')
      table.decimal('roe', 10, 5).comment('Return on Equity indicating the profitability relative to shareholders\' equity.')
      table.decimal('avg_liquidity_2_months', 15, 2).comment('Average Liquidity over the past 2 months indicating the average trading volume or liquidity of the stock.')
      table.decimal('net_equity', 15, 2).comment('Net Equity representing the total assets minus total liabilities of the company.')
      table.decimal('gross_debt_to_equity', 10, 2).comment('Gross Debt to Equity ratio measuring the company\'s financial leverage by comparing its total gross debt to shareholders\' equity.')
      table.decimal('revenue_growth_5y', 10, 5).comment('Revenue Growth over the past 5 years indicating the percentage increase in revenue over a five-year period.')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}