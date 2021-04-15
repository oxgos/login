const JWT = require('../utils/JWT')

// 验证token是否有效
const validateAuth = (ctx, next) => {
  const token = ctx.request.header.authorization
  const reg = new RegExp(/^Bearer\s(.+)/)
  const matches = token.match(reg)
  if (matches.length > 0) {
    const isAuth = JWT.vertify(matches[1])
    if (isAuth) {
      next()
    }
  }
  ctx.status = 401
  return
}

module.exports = validateAuth
