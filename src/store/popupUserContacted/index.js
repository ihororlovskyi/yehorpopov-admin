import * as firebase from 'firebase'

export default {

  state: {
    loadedPopupUserContacted: []
  },

  mutations: {
    setLoadedPopupUserContacted (state, payload) {
      state.loadedPopupUserContacted = payload
    },
    updatePopupUserContacted (state, payload) {
      state.loadedPopupUserContacted.popupPhoto = payload.popupPhoto
      state.loadedPopupUserContacted.popupPerson = payload.popupPerson
      state.loadedPopupUserContacted.popupOrderTitle = payload.popupOrderTitle
      state.loadedPopupUserContacted.popupOrderMessage = payload.popupOrderMessage
      state.loadedPopupUserContacted.popupOrderMessageThanks = payload.popupOrderMessageThanks
      state.loadedPopupUserContacted.popupDownloadTitle = payload.popupDownloadTitle
      state.loadedPopupUserContacted.popupDownloadMessage = payload.popupDownloadMessage
      state.loadedPopupUserContacted.popupDownloadMessageThanks = payload.popupDownloadMessageThanks
    }
  },

  actions: {
    loadPopupUserContacted ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('popupUserContacted').once('value')
        .then((data) => {
          const content = data.val()
          commit('setLoadedPopupUserContacted', content)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    updatePopupUserContacted ({ commit }, payload) {
      const updateObj = {}
      updateObj.popupPhoto = payload.popupPhoto
      updateObj.popupPerson = payload.popupPerson
      updateObj.popupOrderTitle = payload.popupOrderTitle
      updateObj.popupOrderMessage = payload.popupOrderMessage
      updateObj.popupOrderMessageThanks = payload.popupOrderMessageThanks
      updateObj.popupDownloadTitle = payload.popupDownloadTitle
      updateObj.popupDownloadMessage = payload.popupDownloadMessage
      updateObj.popupDownloadMessageThanks = payload.popupDownloadMessageThanks
      firebase.database().ref('popupUserContacted').update(updateObj)
        .then(() => {
          commit('updatePopupUserContacted', payload)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },

  getters: {
    loadedPopupUserContacted (state) {
      return state.loadedPopupUserContacted
    }
  }

}
