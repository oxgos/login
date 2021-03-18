const userModel = require('../models/user')

module.exports = {
  async signIn(ctx, next) {
    console.log(ctx.request.body)
    const { account, password } = ctx.request.body
    try {
      const findResult = await userModel.findDataByAccount(account)
      if (Array.isArray(findResult) && findResult.length > 0) {
        result = findResult[0]
      } else {
        throw new Error('账号或者密码错误')
      }
    } catch(e) {
      result = e
    }
    ctx.__result__ = result
    next()
  },
  async signUp(ctx) {

  },
  async logout(ctx) {

  }
}