import * as firebase from 'firebase'

export default {

  state: {
    loadedCustomProject: []
  },

  mutations: {
    setLoadedCustomProject (state, payload) {
      state.loadedCustomProject = payload
    },
    updateCustomProject (state, payload) {
      state.loadedCustomProject.widgetTitle = payload.widgetTitle
      state.loadedCustomProject.description = payload.description
      state.loadedCustomProject.img = payload.img
      state.loadedCustomProject.prePriceText = payload.prePriceText
      state.loadedCustomProject.price = payload.price
    }
  },

  actions: {
    loadCustomProject ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('customProject').once('value')
        .then((data) => {
          const content = data.val()
          commit('setLoadedCustomProject', content)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    updateCustomProject ({ commit }, payload) {
      const updateObj = {}
      updateObj.widgetTitle = payload.widgetTitle
      updateObj.description = payload.description
      updateObj.img = payload.img
      updateObj.prePriceText = payload.prePriceText
      updateObj.price = payload.price
      firebase.database().ref('customProject').update(updateObj)
        .then(() => {
          commit('updateCustomProject', payload)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },

  getters: {
    loadedCustomProject (state) {
      return state.loadedCustomProject
    }
  }

}
