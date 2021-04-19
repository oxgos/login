const fs = require('fs')
const path = require('path')
const { v1: uuidv1 } = require('uuid')
const crypto = require('crypto')

const userModel = require('../models/user')
const JWT = require('../utils/JWT')
const { getPrivateKey, rsaOaepDecrypt, encodePassword } = require('../utils/global')

module.exports = {
  // 获取publicKey
  async getPublicKey(ctx, next) {
    const pub = fs.readFileSync(path.resolve(__dirname, '..', 'assets/rsa/rsa_1024_pub.pem'), 'utf8')
    ctx.__result__ = pub.split('\n').join('')
    next()
  },
  // 登陆
  async signIn(ctx, next) {
    const { account, password } = ctx.request.body
    // 解码密码
    const decrypted = rsaOaepDecrypt(getPrivateKey(), password)
    let result
    try {
      // 判断是否有这个账号
      const findResult = await userModel.findDataByAccount(account)
      if (Array.isArray(findResult) && findResult.length > 0) {
        let res = findResult[0]
        const pwd = encodePassword(decrypted, res.salt)
        if (pwd === res.password) {
          result = JWT.generate({
            data: {
              userId: res.user_id,
              userName: res.user_name
            },
            expireTime: +new Date() + (7 * 24 * 60 * 60)
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
  // 注册
  async signUp(ctx, next) {
    const { account, userName, password } = ctx.request.body
    // 解码密码
    const decrypted = rsaOaepDecrypt(getPrivateKey(), password)
    let result
    try {
      // 判断是否有这个账号
      const findResult = await userModel.findDataByAccount(account)
      if (Array.isArray(findResult) && findResult.length > 0) {
        throw new Error('账号已存在')
      } else {
        const size = 16
        const salt = crypto.randomBytes(size).toString('hex')
        const pwd = encodePassword(decrypted, salt)
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
