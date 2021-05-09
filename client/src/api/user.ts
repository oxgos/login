import BaseDao from '@/api/base'

class UserDao extends BaseDao{
  // 获取公钥
  getPublicKey(): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `/user/getPublicKey`
      this.axios.get(url)
        .then((res: any) => {
          const result = res.data
          if (result.code === BaseDao.RES_OK) {
            resolve(result.data)
          } else {
            reject(result)
          }
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
  // 注册
  signup(account: string, userName: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `/user/signUp`
      this.axios.post(url, { account, userName, password })
        .then((res: any) => {
          const result = res.data
          if (result.code === BaseDao.RES_OK) {
            resolve(result.data)
          } else {
            reject(result)
          }
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
  // 登陆
  signin(account: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `/user/signIn`
      this.axios.post(url, { account, password })
        .then((res: any) => {
          const result = res.data
          if (result.code === BaseDao.RES_OK) {
            resolve(result.data)
          } else {
            reject(result)
          }
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
  // 刷新token
  refreshToken(token: any, refreshToken: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `/user/refreshToken`
      this.axios.post(url, { token, refreshToken })
          .then((res: any) => {
            const result = res.data
            if (result.code === BaseDao.RES_OK) {
              resolve(result.data)
            } else {
              reject(result)
            }
          })
          .catch((e: any) => {
            reject(e)
          })
    })
  }
}

export default UserDao