import { GetterTree, Getter } from 'vuex'
import { State } from './index'

const token: Getter<State, any> = (state: State) => state.login.token

const getters: GetterTree<State, any> = {
  token,
}

export default getters