import jsrsasign from 'jsrsasign'

interface rsaKeypair {
  privateKey: String,
  publicKey: String
}

// 生成rsa
export function generateRsaKey(): rsaKeypair {
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
export function encodeWithRsa(target: string, publicKey: jsrsasign.RSAKey): string {
  const pub = jsrsasign.KEYUTIL.getKey(publicKey)
  // 对应java填充方式: RSA_PKCS1_OAEP_PADDING
  const encrypted = jsrsasign.KJUR.crypto.Cipher.encrypt(target, (pub as jsrsasign.RSAKey), "RSAOAEP")
  const encryptedB64 = jsrsasign.hextob64(encrypted)

  return encryptedB64
}