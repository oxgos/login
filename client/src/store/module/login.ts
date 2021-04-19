import { MutationTree, ActionTree, Module } from 'vuex'

import UserDao from '@/api/user'
import { encodeWithRsa } from '@/utils/gobalUtil'

const userDao = new UserDao()

// 定义state接口
export interface loginState {
  token: string
}

const state: loginState = {
  token: ''
}

const mutations: MutationTree<loginState> = {
  SET_TOKEN(state: loginState, payload: any) {
    state.token = payload
  }
}

const actions: ActionTree<loginState, any> = {
  // 登陆
  signIn({ commit }, { account, password }): Promise<void> {
    return new Promise((resolve, reject) => {
      const encryptedB64: string = encodeWithRsa(password, (window as any).__publickKey__)
      userDao.signin(account, encryptedB64)
        .then((res: any) => {
          commit('SET_TOKEN', res)
          resolve()
        })
        .catch((e: any) => {
          console.log(e)
          reject(e)
        })
    })
  }
}

export const login: Module<loginState, any> = {
  namespaced: true,
  state,
  mutations,
  actions
}