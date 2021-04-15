import axios from 'axios'
import store from '@/store'

const whiteList: Array<string> = [
  '/user/getPublicKey',
  '/user/signUp',
  '/user/signUp'
]

const service = axios.create({
  timeout: 20000
})

// 添加请求拦截器
service.interceptors.request.use((config) => {
  if (config.url && !whiteList.includes(config.url)) {
    config.headers.common['Authorization'] = `Bearer ${store.getters.token}`
  }
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use((response) => {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
})

export default service
