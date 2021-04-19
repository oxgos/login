import axios from '@/api/interceptor'

export default class BaseDao {
  // BaseDao属性
  axios
  // 请求成功code=1
  static RES_OK = 1

  constructor() {
    this.axios = axios
  }
}