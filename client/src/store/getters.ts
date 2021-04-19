import { GetterTree, Getter } from 'vuex'
import { LoginState, TestState } from './index'

const token: Getter<LoginState, any> = (state: LoginState) => state.login.token
const dialogs: Getter<TestState, any> = (state: TestState) => state.test.dialogs

const getters: GetterTree<any, any> = {
  token,
  dialogs
}

export default getters