import EasyAccess, { defaultMutations } from 'vuex-easy-access'
export const state = () => ({
  authenticated: false,
  staticURL: process.env.privateURL,
  stateDialog: false,
})
export const mutations = { ...defaultMutations(state()) }
export const plugins = [EasyAccess()]
export const actions = {
  setDialog({ dispatch }, params) {
    dispatch('set/stateDialog', params)
  },
}
