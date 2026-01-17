// import type { HttpContext } from '@adonisjs/core/http'

import Ticker from '#models/ticker'

export default class TickersController {
  async index() {
    return await Ticker.all()
  }

  async show({ params }: { params: { id: string } }) {
    const ticker = await Ticker.findOrFail(params.id)
    return ticker
  }
}
