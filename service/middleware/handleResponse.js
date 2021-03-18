const successResponse = (data) => {
  return {
    code: 1,
    data,
    msg: 'success'
  }
}

const failResponse = (e) => {
  let attrs = Object.getOwnPropertyNames(e)
  attrs = attrs.filter(attr => attr !== 'stack')
  return {
    code: 0,
    data: null,
    msg: JSON.stringify(e, attrs, 2)
  }
}

const handleResponse = (ctx) => {
  const result = ctx.__result__
  ctx.body = result instanceof Error
    ? failResponse(result)
    : successResponse(result)
}

module.exports = handleResponse