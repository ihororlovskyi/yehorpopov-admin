import * as firebase from 'firebase'

export default {

  state: {
    loadedAboutWidget: []
  },

  mutations: {
    setLoadedAboutWidget (state, payload) {
      state.loadedAboutWidget = payload
    },
    updateAboutWidget (state, payload) {
      state.loadedAboutWidget.widgetTitle = payload.widgetTitle
      state.loadedAboutWidget.widgetIsPublished = payload.widgetIsPublished
      state.loadedAboutWidget.widgetDescription = payload.widgetDescription
      state.loadedAboutWidget.widgetImg = payload.widgetImg
    }
  },

  actions: {
    loadAboutWidget ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('aboutWidget').once('value')
        .then((data) => {
          const content = data.val()
          commit('setLoadedAboutWidget', content)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    updateAboutWidget ({ commit }, payload) {
      const updateObj = {}
      updateObj.widgetTitle = payload.widgetTitle
      updateObj.widgetIsPublished = payload.widgetIsPublished
      updateObj.widgetDescription = payload.widgetDescription
      updateObj.widgetImg = payload.widgetImg
      firebase.database().ref('aboutWidget').update(updateObj)
        .then(() => {
          commit('updateAboutWidget', payload)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },

  getters: {
    loadedAboutWidget (state) {
      return state.loadedAboutWidget
    }
  }

}
