const router = require('koa-router')()
const userController = require('../controllers/user')
const handleResponse = require('../middleware/handleResponse')

const routers = router
  .post('/signIn', userController.signIn, handleResponse)
  .post('/signUp', userController.signUp, handleResponse)
  .get('/logout', userController.logout, handleResponse)
 
  
module.exports = routers
