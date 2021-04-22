const crypto = require('crypto')
const secret = 'my-secret'

class JWT {
  // 生成token
  static generate({ alg = 'HS256', data, expireTime } = {}) {
    let jwtHeader = {
      alg,
      typ: 'JWT'
    }
    // 生成header的base64字符串
    jwtHeader = Buffer.from(JSON.stringify(jwtHeader)).toString('base64')
    let payload = {
      data
    }
    if (expireTime) {
      payload.exp = (+new Date()) + expireTime
    }
    // 生成payload的base64字符串
    payload = Buffer.from(JSON.stringify(payload)).toString('base64')
    // signature
    let signature = this.getSignature(`${jwtHeader}.${payload}`, alg)

    return `${jwtHeader}.${payload}.${signature}`
  }
  // 验证token
  static vertify(token) {
    if (!isToken(token)) return false
    
    const header = JWT.decodeHeader(token)
    if (!header) return false
    
    const jwtArr = token.split('.')
    const signature = jwtArr[2]
    const compare = this.getSignature(`${jwtArr[0]}.${jwtArr[1]}`, header.alg)
    return signature === compare
  }
  // 是否失效
  static isExpired(token) {
   const payload = JWT.decodePayload(token)
   // 没设置过期时间，永不失效
   if (!payload.exp) return false

   if (payload.exp && payload.exp >= +new Date()) {
     return false
   } else {
     return true
   }
  }
  // 解析header数据
  static decodeHeader(token) {
    if (!isToken(token)) return

    const jwtArr = token.split('.')
    try {
      return JSON.parse(Buffer.from(jwtArr[0], 'base64').toString())
    } catch(e) {
      console.log(e)
      return null
    }
  }
  // 解析payload数据
  static decodePayload(token) {
    if (!isToken(token)) return

    const jwtArr = token.split('.')
    try {
      return JSON.parse(Buffer.from(jwtArr[1], 'base64').toString())
    } catch(e) {
      console.log(e)
      return null
    }
  }
  // 获取签名
  static getSignature(jwtStr, alg) {
    let { algMethod, algorithm } = this.getAlgMethod(alg)
    return crypto[algMethod](algorithm, secret).update(jwtStr).digest('base64')
  }
  // 判断加密方法
  static getAlgMethod(alg) {
    // 判断加密方法
    let algMethod = '',
      algorithm = ''
    switch(alg) {
      default:
      case 'HS256':
        algorithm = 'sha256'
        algMethod = 'createHmac'
        break
    }
    return { algMethod, algorithm }
  }
}

// 验证是否token
function isToken(str) {
  if (!str) return false
    
  const jwtArr = str.split('.')
  // 校验是否分成3份
  return jwtArr.length === 3
}

module.exports = JWT
