const router = require('koa-router')()
const dialogController = require('../controllers/dialog')
const validateJWT = require('../middleware/validateJWT')
const validateCookie = require('../middleware/validateCookie')
const handleResponse = require('../middleware/handleResponse')

const routers = router
  .get('/getDialogs', validateJWT, dialogController.getDialogs, handleResponse)
  .get('/getDialogsWithCookie', validateCookie, dialogController.getDialogsWithCookie, handleResponse)
 
  
module.exports = routers
