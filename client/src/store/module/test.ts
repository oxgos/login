import { MutationTree, ActionTree, Module } from 'vuex'

import TestDao from '@/api/test'

const testDao = new TestDao()

export interface testState {
  dialogs: object | null
}

const state: testState = {
  dialogs: null
}

const mutations: MutationTree<testState> = {
  SET_DIALOGS(state: testState, payload: any) {
    state.dialogs = payload
  }
}

const actions: ActionTree<testState, any> = {
  getDialogs({ commit }): Promise<void> {
    return new Promise((resolve, reject) => {
      testDao.getDialogData()
        .then((res: any) => {
          commit('SET_DIALOGS', res)
          resolve()
        })
        .catch((e: any) => {
          console.log(e)
          commit('SET_DIALOGS', null)
          reject(e)
        })
    })
  },
  getDialogsWithCookie({ commit }): Promise<void> {
    return new Promise((resolve, reject) => {
      testDao.getDialogDataWithCookie()
        .then((res: any) => {
          commit('SET_DIALOGS', res)
          resolve()
        })
        .catch((e: any) => {
          console.log(e)
          commit('SET_DIALOGS', null)
          reject(e)
        })
    })
  }
}

export const test: Module<testState, any> = {
  namespaced: true,
  state,
  mutations,
  actions
}