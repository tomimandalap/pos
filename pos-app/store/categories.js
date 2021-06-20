import EasyAccess, { defaultMutations } from 'vuex-easy-access'
export const state = () => ({
  dataCategories: [],
  detailCategory: [],
  message: '',
})
export const mutations = { ...defaultMutations(state()) }
export const plugins = [EasyAccess()]
export const actions = {
  getAllCategories({ dispatch }, params) {
    return this.$axios
      .get(
        `/baseurl/api/v1/categories?filter=${params.filter}&keyword=${params.keyword}&sortby=id&orderby=${params.orderby}&page=${params.page}&limit=${params.limit}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((response) => {
        dispatch('set/dataCategories', response.data.data)
        return true
      })
      .catch((error) => {
        dispatch('set/dataCategories', error.response.data.data)
        return false
      })
  },
  getDetailCategory({ dispatch }, params) {
    return this.$axios
      .get(`/baseurl/api/v1/category/${params}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        dispatch('set/detailCategory', response.data.data)
        return true
      })
      .catch((error) => {
        dispatch('set/detailCategory', error.response.data.data)
        return false
      })
  },
  postCategory({ dispatch }, params) {
    return this.$axios
      .post('/baseurl/api/v1/category', params, {
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
  patchCategory({ dispatch }, params) {
    return this.$axios
      .patch(`/baseurl/api/v1/category/${params.id}`, params.data, {
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
  deleteCategory({ dispatch }, params) {
    return this.$axios
      .delete(`/baseurl/api/v1/category/${params}`, {
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
