const {
  register, 
  login, 
  logout,
  activation, 
  profileMe,
  getAllUser, 
  getDetailUser,
  updateUser,
  deleteUser
} = require('../controllers/c_users')
const { authentication, authAdmin } = require('../helpers/middleware/auth')
const singleUploadProject = require('../helpers/middleware/profile')

const express = require('express')
const routers = express.Router()

routers
  .get('/user/me', authentication, profileMe)
  .post('/register', register)
  .post('/login', login)
  .post('/logout', authentication, logout)
  .get('/activate/:token/:email/:position/:access', activation)
  .get('/users', authentication, authAdmin, getAllUser)
  .get('/user/:id', authentication, getDetailUser)
  .patch('/user/:id', authentication, singleUploadProject, updateUser)
  .delete('/user/:id', authentication, authAdmin, deleteUser)

module.exports = routers
