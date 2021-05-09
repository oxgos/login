const fs = require('fs')
const path = require('path')
const { v1: uuidv1 } = require('uuid')
const crypto = require('crypto')
const Store = require('../utils/redis')

const userModel = require('../models/user')
const JWT = require('../utils/JWT')
const { getPrivateKey, rsaOaepDecrypt, encodePassword } = require('../utils/global')
const { Secret_Prefix } = require('../utils/constant')

const jwtAlg = 'HS256'

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
    let result
    try {
      // 判断是否有这个账号
      const findResult = await userModel.findDataByAccount(account)
      if (Array.isArray(findResult) && findResult.length > 0) {
        // 解码密码
        const decrypted = rsaOaepDecrypt(getPrivateKey(), password)
        const { password: sqlPwd, salt, user_id: userId, user_name: userName } = findResult[0]
        const pwd = encodePassword(decrypted, salt)
        if (pwd === sqlPwd) {
          const secret = uuidv1()
          const jwtOpts = {
            alg: jwtAlg,
            data: {
              userId,
              userName
            },
            secret
          }
          // 生成token
          const token = JWT.generate(Object.assign({}, jwtOpts, {
            expireTime: 7 * 24 * 60 * 60 * 1000
          }))
          // 生成refreshToken
          const refreshToken = JWT.generate(jwtOpts)
          result = {
            token,
            refreshToken
          }
          await Store.set(`${Secret_Prefix}${token}`, secret)
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
    let result
    try {
      // 判断是否有这个账号
      const findResult = await userModel.findDataByAccount(account)
      if (Array.isArray(findResult) && findResult.length > 0) {
        throw new Error('账号已存在')
      } else {
        // 解码密码
        const decrypted = rsaOaepDecrypt(getPrivateKey(), password)
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
  // 刷新token
  async refreshToken(ctx, next) {
    const { token, refreshToken } = ctx.request.body
    let result
    try {
      const header = JWT.decodeHeader(refreshToken)
      const payload = JWT.decodePayload(refreshToken)
      // 获取secret
      const secret = await Store.get(`${Secret_Prefix}${token}`)
      const newToken = JWT.generate({
        alg: header.alg,
        data: payload.data,
        expireTime: 7 * 24 * 60 * 60 * 1000,
        secret
      })
      await Store.del(`${Secret_Prefix}${token}`)
      await Store.set(`${Secret_Prefix}${newToken}`, secret)
      result = newToken
    } catch(e) {
      result = e
    }
    ctx.__result__ = result
    next()
  },
  // 登出
  async logout(ctx) {

  }
}
