import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import { loginState, login } from './module/login'
 
Vue.use(Vuex)

export interface State {
  login: loginState
}

export default new Vuex.Store({
  getters,
  modules: {
    login
  }
})