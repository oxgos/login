import axios from '@/api/interceptor'

const RES_OK = 1

class UserDao {
  // 获取公钥
  getPublicKey() {
    return new Promise((resolve, reject) => {
      const url = `/user/getPublicKey`
      axios.get(url)
        .then((res: any) => {
          if (res.data.code === RES_OK) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
  // 注册
  signup(account: string, userName: string, password: string) {
    return new Promise((resolve, reject) => {
      const url = `/user/signUp`
      axios.post(url, { account, userName, password })
        .then((res: any) => {
          if (res.data.code === RES_OK) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
  // 登陆
  signin(account: string, password: string) {
    return new Promise((resolve, reject) => {
      const url = `/user/signIn`
      axios.post(url, { account, password })
        .then((res: any) => {
          if (res.data.code === RES_OK) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}

export default UserDao