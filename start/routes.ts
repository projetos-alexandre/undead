/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import IndicatorsController from '#controllers/indicators_controller'
import TickersController from '#controllers/tickers_controller'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// Indicators routes
router.get('indicators/logs', [IndicatorsController, 'logs'])

// Tickers routes

router
  .group(() => {
    router.get('/', [TickersController, 'index'])
  })
  .prefix('tickers')
