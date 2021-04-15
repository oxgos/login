// Make sure to register before importing any components
import './utils/classComponentHooks'

import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import UserDao from '@/api/user'

let isInit: Boolean = false
router.beforeEach((to, from, next) => {
  if (!isInit) {
    const userDao = new UserDao()
    userDao.getPublicKey()
      .then((res: any) => {
        (window as any).__publickKey__ = res
        next()
      })
      .catch(e => {
        console.log(e)
        next()
      })
    isInit = true
  } else {
    next()
  }
})

Vue.config.errorHandler = function(e, vm, info) {
  console.log('errorHandler e: ' + e)
  console.log('errorHandler info: ' + info)
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
