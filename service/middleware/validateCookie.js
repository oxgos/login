const invalidResponse = () => {
  return {
    code: 401,
    data: null,
    msg: 'unauthorization'
  }
}

// 验证session是否有效
const validateCookie = async (ctx, next) => {
  console.log('ctx.session.userinfo :' + ctx.session.userinfo)
  if (!ctx.session.userinfo) {
    ctx.status = 401
    ctx.body = invalidResponse()
  } else {
    await next()
  }
}

module.exports = validateCookie
