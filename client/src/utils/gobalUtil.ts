import jsrsasign from 'jsrsasign'

// 生成rsa
export function generateRsaKey() {
  // 大小为1024的rsa
  const rsaKeypair = jsrsasign.KEYUTIL.generateKeypair('RSA', 1024)
  // PKCS#1的私钥和公钥
  const privateKey = jsrsasign.KEYUTIL.getPEM(rsaKeypair.prvKeyObj, 'PKCS1PRV')
  const publicKey = jsrsasign.KEYUTIL.getPEM(rsaKeypair.pubKeyObj)
  
  return {
    privateKey,
    publicKey
  }
}

// 用rsa加密
export function encodeWithRsa(target: string, publicKey: jsrsasign.RSAKey) {
  const pub = jsrsasign.KEYUTIL.getKey(publicKey)
  // 对应java填充方式: RSA/ECBOAEPWithSHA-256AndMGF1Padding
  const encrypted = jsrsasign.KJUR.crypto.Cipher.encrypt(target, (pub as jsrsasign.RSAKey), "RSAOAEP")
  const encryptedB64 = jsrsasign.hextob64(encrypted)

  return encryptedB64
}