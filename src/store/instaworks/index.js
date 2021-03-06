import * as firebase from 'firebase'

export default {

  state: {
    loadedInstaworks: []
  },

  mutations: {
    setLoadedInstaworks (state, payload) {
      state.loadedInstaworks = payload
    },
    updateInstaworks (state, payload) {
      state.loadedInstaworks.title = payload.title
      state.loadedInstaworks.description = payload.description
      state.loadedInstaworks.access_token = payload.access_token
    }
  },

  actions: {
    loadInstaworks ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('instaworks').once('value')
        .then((data) => {
          const content = data.val()
          commit('setLoadedInstaworks', content)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    updateInstaworks ({ commit }, payload) {
      const updateObj = {}
      updateObj.title = payload.title
      updateObj.description = payload.description
      updateObj.access_token = payload.access_token
      firebase.database().ref('instaworks').update(updateObj)
        .then(() => {
          commit('updateInstaworks', payload)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },

  getters: {
    loadedInstaworks (state) {
      return state.loadedInstaworks
    }
  }

}
