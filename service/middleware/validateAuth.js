const JWT = require('../utils/JWT')

const invalidResponse = () => {
  return {
    code: 401,
    data: null,
    msg: 'unauthorization'
  }
}

// 验证token是否有效
const validateAuth = async (ctx, next) => {
  const token = ctx.request.header.authorization
  const reg = new RegExp(/^Bearer\s(.+)/)
  const matches = token.match(reg)
  if (matches && matches.length > 0) {
    const isAuth = JWT.vertify(matches[1])
    if (isAuth) {
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

module.exports = validateAuth
