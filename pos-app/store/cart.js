import EasyAccess, { defaultMutations } from 'vuex-easy-access'
export const state = () => ({
  dataCart: null,
  indexCart: 0,
  totalCart: 0,
  insertId: 0,
  message: '',
})
export const mutations = { ...defaultMutations(state()) }
export const plugins = [EasyAccess()]
export const actions = {
  setTotal({ dispatch }, params) {
    dispatch('set/totalCart', params)
  },
  setIndex({ dispatch }, params) {
    dispatch('set/indexCart', params)
  },
  setTocart({ dispatch }, params) {
    // console.log(params)
    dispatch('set/dataCart', params)
  },
  postOrder({ dispatch }, params) {
    return this.$axios
      .post('/baseurl/api/v1/orders', params, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        dispatch('set/insertId', response.data.data.insertId)
        dispatch('set/message', response.data.message)
        return true
      })
      .catch((error) => {
        dispatch('set/message', error.response.data.message)
        return false
      })
  },
  postDetailOrder({ dispatch }, params) {
    return this.$axios
      .post('/baseurl/api/v1/detailorder', params, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        dispatch('set/message', response.data.message)
        return true
      })
      .catch((error) => {
        dispatch('set/message', error.response.data.message)
        return false
      })
  },
}
