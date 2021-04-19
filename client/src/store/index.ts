import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import { loginState, login } from './module/login'
import { testState, test } from './module/test'
 
Vue.use(Vuex)

export interface LoginState {
  login: loginState
}

export interface TestState {
  test: testState
}

export default new Vuex.Store({
  getters,
  modules: {
    login,
    test
  }
})