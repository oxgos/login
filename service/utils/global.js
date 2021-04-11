const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

// base64转buffer
const b64ToBuf = function(b64) {
  let b = Buffer.from(b64, 'base64')
  return b
}

// 读取privateKey
const getPrivateKey = function(src) {
  if (!src) {
    src = path.resolve(__dirname, '..', 'assets/rsa/rsa_1024_priv.pem')
  }
  return fs.readFileSync(src, 'utf8')
}

// rsa解码
const rsaOaepDecrypt = function(key, b64) {
  console.log('b64ToBuf(b64): ' + b64ToBuf(b64))
  let decryptedBuf = crypto.privateDecrypt(key, b64ToBuf(b64))
  return decryptedBuf.toString()
}

// 用pdkdf2加盐encode密码
const encodePassword = function(pwd, salt) {
  const iterations = 4096
  const keylen = 16
  const digest = 'sha512'
  return crypto.pbkdf2Sync(pwd, salt, iterations, keylen, digest).toString('hex')
}

exports.b64ToBuf = b64ToBuf
exports.getPrivateKey = getPrivateKey
exports.rsaOaepDecrypt = rsaOaepDecrypt
exports.encodePassword = encodePassword