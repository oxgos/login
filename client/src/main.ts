import Vue from 'vue'
import App from './App.vue'
import router from './router'

import UserDao from '@/api/user'

let isInit: Boolean = false
router.beforeEach((to, from, next) => {
  if (!isInit) {
    const userDao = new UserDao()
    userDao.getPublicKey()
      .then((res: any) => {
        (window as any).__publickKey__ = res.data
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
  render: h => h(App)
}).$mount('#app')
