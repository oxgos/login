const router = require('koa-router')()
const dialogController = require('../controllers/dialog')
const validateAuth = require('../middleware/validateAuth')
const handleResponse = require('../middleware/handleResponse')

const routers = router
  .get('/getDialogs', validateAuth, dialogController.getDialogs, handleResponse)
 
  
module.exports = routers
