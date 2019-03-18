import * as firebase from 'firebase'

export default {

  state: {
    loadedContacts: []
  },

  mutations: {
    setLoadedContacts (state, payload) {
      state.loadedContacts = payload
    },
    updateContacts (state, payload) {
      state.loadedContacts.title = payload.title
      state.loadedContacts.phone = payload.phone
      state.loadedContacts.email = payload.email
      state.loadedContacts.mapLocation = payload.mapLocation
      state.loadedContacts.address = payload.address
    }
  },

  actions: {
    loadContacts ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('contacts').once('value')
        .then((data) => {
          const contactsContent = data.val()
          commit('setLoadedContacts', contactsContent)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    updateContacts ({ commit }, payload) {
      const updateObj = {}
      updateObj.title = payload.title
      updateObj.phone = payload.phone
      updateObj.email = payload.email
      updateObj.mapLocation = payload.mapLocation
      updateObj.address = payload.address
      firebase.database().ref('contacts').update(updateObj)
        .then(() => {
          commit('updateContacts', payload)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },

  getters: {
    loadedContacts (state) {
      return state.loadedContacts
    }
  }

}
