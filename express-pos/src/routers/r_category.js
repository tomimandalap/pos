const {
  addCategory,
  allCategory,
  detailCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/c_category')
const { authentication, authAdmin } = require('../helpers/middleware/auth')
const express = require('express')
const routers = express.Router()

routers
  .post('/category', authentication, authAdmin, addCategory)
  .get('/categories', authentication, authAdmin, allCategory)
  .get('/category/:id', authentication, authAdmin, detailCategory)
  .patch('/category/:id', authentication, authAdmin, updateCategory)
  .delete('/category/:id', authentication, authAdmin, deleteCategory)

module.exports = routers