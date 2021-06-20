import EasyAccess, { defaultMutations } from 'vuex-easy-access'
export const state = () => ({
  dataStock: [],
  message: '',
})
export const mutations = { ...defaultMutations(state()) }
export const plugins = [EasyAccess()]
export const actions = {
  getAllStock({ dispatch }, params) {
    return this.$axios
      .get(
        `/baseurl/api/v1/stocks?filter=${params.filter}&keyword=${params.keyword}&sortby=${params.sortby}&orderby=${params.orderby}&page=${params.page}&limit=${params.limit}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((response) => {
        dispatch('set/dataStock', response.data.data)
        return true
      })
      .catch((error) => {
        dispatch('set/dataStock', error.response.data.data)
        return false
      })
  },
  postStock({ dispatch }, params) {
    return this.$axios
      .post('/baseurl/api/v1/stocks', params, {
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
