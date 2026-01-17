// import type { HttpContext } from '@adonisjs/core/http'
import { IndicatorService } from '#services/indicator_service'
import { inject } from '@adonisjs/core'

@inject()
export default class IndicatorsController {
  constructor(protected indicatorService: IndicatorService) {}
  logs() {
    return this.indicatorService.logs()
  }
}
