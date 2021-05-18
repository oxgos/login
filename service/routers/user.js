const router = require('koa-router')()
const userController = require('../controllers/user')
const handleResponse = require('../middleware/handleResponse')

const routers = router
  .get('/getPublicKey', userController.getPublicKey, handleResponse)
  .post('/refreshToken', userController.refreshToken, handleResponse)
  .post('/signIn', userController.signIn, handleResponse)
  .post('/signInWithCookie', userController.signInWithCookie, handleResponse)
  .post('/signUp', userController.signUp, handleResponse)
  .get('/logout', userController.logout, handleResponse)
 
  
module.exports = routers
