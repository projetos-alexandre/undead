// import type { HttpContext } from '@adonisjs/core/http'

import Ticker from '#models/ticker'

export default class TickersController {
  async index() {
    return await Ticker.all()
  }
}
