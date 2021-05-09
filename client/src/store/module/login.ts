import { MutationTree, ActionTree, Module } from 'vuex'

import UserDao from '@/api/user'
import { encodeWithRsa } from '@/utils/gobalUtil'

const userDao = new UserDao()

// 定义state接口
export interface loginState {
  token: string | null,
  refreshToken: string | null
}

const state: loginState = {
  token: null,
  refreshToken: null
}

const mutations: MutationTree<loginState> = {
  SET_TOKEN(state: loginState, token: string) {
    state.token = token
  },
  SET_REFRESH_TOKEN(state: loginState, refreshToken: string) {
    state.refreshToken = refreshToken
  },
}

const actions: ActionTree<loginState, any> = {
  // 登陆
  signIn({ commit }, { account, password }): Promise<void> {
    return new Promise((resolve, reject) => {
      const encryptedB64: string = encodeWithRsa(password, (window as any).__publickKey__)
      userDao.signin(account, encryptedB64)
        .then((res: any) => {
          commit('SET_TOKEN', res.token)
          commit('SET_REFRESH_TOKEN', res.refreshToken)
          resolve()
        })
        .catch((e: any) => {
          console.log(e)
          reject(e)
        })
    })
  },
  // 刷新token
  refreshToken({ state, commit }): Promise<void> {
    return new Promise((resolve, reject) => {
      userDao.refreshToken(state.token, state.refreshToken)
        .then((token: any) => {
          commit('SET_TOKEN', token)
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