const userModel = require('../models/user')
const JWT = require('../utils/JWT')
const { v1: uuidv1 } = require('uuid')
const crypto = require('crypto')

module.exports = {
  async signIn(ctx, next) {
    const { account, password } = ctx.request.body
    let result
    try {
      // 判断是否有这个账号
      const findResult = await userModel.findDataByAccount(account)
      if (Array.isArray(findResult) && findResult.length > 0) {
        let res = findResult[0]
        const pwd = encodePassword(password, res.salt)
        if (pwd === res.password) {
          result = JWT.generate({
            data: {
              userId: res.user_id,
              userName: res.user_name
            },
            expireTime: 7 * 24 * 60 * 60
          })
        } else {
          throw new Error('账号或者密码错误')
        }
      } else {
        throw new Error('账号或者密码错误')
      }
    } catch(e) {
      result = e
    }
    ctx.__result__ = result
    next()
  },
  async signUp(ctx, next) {
    const { account, userName, password } = ctx.request.body
    let result
    try {
      // 判断是否有这个账号
      const findResult = await userModel.findDataByAccount(account)
      if (Array.isArray(findResult) && findResult.length > 0) {
        throw new Error('账号已存在')
      } else {
        const size = 16
        const salt = crypto.randomBytes(size).toString('hex')
        const pwd = encodePassword(password, salt)
        await userModel.signUp({
          user_id: uuidv1(),
          account,
          user_name: userName,
          password: pwd,
          salt
        })
      }
    } catch(e) {
      result = e
    }
    ctx.__result__ = result
    next()
  },
  async logout(ctx) {

  }
}

function encodePassword(pwd, salt) {
  const iterations = 4096
  const keylen = 16
  const digest = 'sha512'
  return crypto.pbkdf2Sync(pwd, salt, iterations, keylen, digest).toString('hex')
}