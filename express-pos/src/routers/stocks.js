const stocks = require('../controllers/c_stocks')
const { authentication, authAdmin } = require('../helpers/middleware/auth')
const express = require('express')
const routers = express.Router()

routers
  .post('/stocks', authentication, stocks.addStock)
  .get('/stocks', authentication, authAdmin, stocks.allStock)
  .get('/stocks/:id', authentication, authAdmin, stocks.detailStocks)
  .get('/productstocks/:id', authentication, authAdmin, stocks.detailProductStocksId)

module.exports = routers