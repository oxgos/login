const router = require('koa-router')()
const user = require('./user')
const dialog = require('./dialog')

router.use('/user', user.routes(), user.allowedMethods())
router.use('/dialog', dialog.routes(), dialog.allowedMethods())

module.exports = router