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
      data,
      exp: (+new Date()) + expireTime
    }
    // 生成payload的base64字符串
    payload = Buffer.from(JSON.stringify(payload)).toString('base64')
    
    // signature
    let signature = this.getSignature(`${jwtHeader}.${payload}`, alg)

    return `${jwtHeader}.${payload}.${signature}`
  }
  // 验证token
  static vertify(token, { alg = 'HS256' } = {}) {
    if (!token) return
    
    const jwtArr = token.split('.')
    const signature = jwtArr[2]
    const compare = this.getSignature(`${jwtArr[0]}.${jwtArr[1]}`, alg)
    return signature === compare
  }
  // 解析payload数据
  static decodePayload(token) {
    if (!token) return

    const jwtArr = token.split('.')
    return JSON.parse(Buffer.from(jwtArr[1], 'base64').toString())
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

module.exports = JWT
