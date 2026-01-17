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
router
  .group(() => {
    router.get('/logs', [IndicatorsController, 'logs'])
    router.get('/stocks', [IndicatorsController, 'stocks'])
  })
  .prefix('indicators')

// Tickers routes

router
  .group(() => {
    router.get('/', [TickersController, 'index'])
    router.get('/:id', [TickersController, 'show'])
  })
  .prefix('tickers')
