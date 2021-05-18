import BaseDao from '@/api/base'

class UserDao extends BaseDao{
  // 获取公钥
  getPublicKey(): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `/user/getPublicKey`
      this.axios.get(url)
        .then((res: any) => {
          handleResponse(res, resolve, reject)
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
          handleResponse(res, resolve, reject)
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
          handleResponse(res, resolve, reject)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
  // 登陆with cookie
  signinWithCookie(account: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `/user/signInWithCookie`
      this.axios.post(url, { account, password })
        .then((res: any) => {
          handleResponse(res, resolve, reject)
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
            handleResponse(res, resolve, reject)
          })
          .catch((e: any) => {
            reject(e)
          })
    })
  }
  // 登出
  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `/user/logout`
      this.axios.get(url)
        .then((res: any) => {
          handleResponse(res, resolve, reject)
        })
        .catch(e => {
          reject(e)
        })
    })
  }
}

function handleResponse(res: any, successCb: any, failCb: any): void {
  const result = res.data
  if (result.code === BaseDao.RES_OK) {
    successCb(result.data)
  } else {
    failCb(result)
  }
}

export default UserDao