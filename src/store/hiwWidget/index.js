import * as firebase from 'firebase'

export default {

  state: {
    loadedHiwWidget: []
  },

  mutations: {
    setLoadedHiwWidget (state, payload) {
      state.loadedHiwWidget = payload
    },
    updateHiwWidget (state, payload) {
      state.loadedHiwWidget.widgetTitle = payload.widgetTitle
      state.loadedHiwWidget.widgetIsPublished = payload.widgetIsPublished
    }
  },

  actions: {
    loadHiwWidget ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('hiwWidget').once('value')
        .then((data) => {
          const content = data.val()
          commit('setLoadedHiwWidget', content)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    updateHiwWidget ({ commit }, payload) {
      const updateObj = {}
      updateObj.widgetTitle = payload.widgetTitle
      updateObj.widgetIsPublished = payload.widgetIsPublished
      firebase.database().ref('hiwWidget').update(updateObj)
        .then(() => {
          commit('updateHiwWidget', payload)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },

  getters: {
    loadedHiwWidget (state) {
      return state.loadedHiwWidget
    }
  }

}
