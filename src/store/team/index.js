import * as firebase from 'firebase'

export default {

  state: {
    loadedTeam: []
  },

  mutations: {
    setLoadedTeam (state, payload) {
      state.loadedTeam = payload
    },
    updateTeam (state, payload) {
      state.loadedTeam.widgetTitle = payload.widgetTitle
      state.loadedTeam.widgetIsPublished = payload.widgetIsPublished
    }
  },

  actions: {
    loadTeam ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('team').once('value')
        .then((data) => {
          const content = data.val()
          commit('setLoadedTeam', content)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    updateTeam ({ commit }, payload) {
      const updateObj = {}
      updateObj.widgetTitle = payload.widgetTitle
      updateObj.widgetIsPublished = payload.widgetIsPublished
      firebase.database().ref('team').update(updateObj)
        .then(() => {
          commit('updateTeam', payload)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },

  getters: {
    loadedTeam (state) {
      return state.loadedTeam
    }
  }

}
