import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tickers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('symbol', 10).notNullable().unique().comment('Stock ticker symbol used to identify the publicly traded company.')
      table.string('name', 255).comment('Name of the publicly traded company.')
      table.string('segment', 100).comment('Market segment or sector to which the company belongs.')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}