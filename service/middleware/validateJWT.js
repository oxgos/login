const JWT = require('../utils/JWT')
const Store = require('../utils/redis')
const { Secret_Prefix } = require('../utils/constant')

const invalidResponse = () => {
  return {
    code: 401,
    data: null,
    msg: 'unauthorization'
  }
}

// 验证token是否有效
const validateJWT = async (ctx, next) => {
  const auth = ctx.request.header.authorization
  const reg = new RegExp(/^Bearer\s(.+)/)
  const matches = auth.match(reg)
  if (matches && matches.length > 0) {
    const token = matches[1]
    // 获取secret
    const secret = await Store.get(`${Secret_Prefix}${token}`)
    // token校验及token是否过期
    if (secret && !JWT.isExpired(token)) {
      await next()
    } else {
      ctx.status = 401
      ctx.body = invalidResponse()
    }
  } else {
    ctx.status = 401
    ctx.body = invalidResponse()
  }
}

module.exports = validateJWT
