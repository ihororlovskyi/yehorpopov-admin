import * as firebase from 'firebase'

export default {

  state: {
    loadedHero: []
  },

  mutations: {
    setLoadedHero (state, payload) {
      state.loadedHero = payload
    },
    updateHero (state, payload) {
      state.loadedHero.messageHome = payload.messageHome
      state.loadedHero.messageZaglushka = payload.messageZaglushka
      state.loadedHero.person = payload.person
      state.loadedHero.userpic = payload.userpic
      state.loadedHero.position = payload.position
    }
  },

  actions: {
    loadHero ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('hero').once('value')
        .then((data) => {
          const heroContent = data.val()
          commit('setLoadedHero', heroContent)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    updateHero ({ commit }, payload) {
      const updateObj = {}
      updateObj.messageHome = payload.messageHome
      updateObj.messageZaglushka = payload.messageZaglushka
      updateObj.person = payload.person
      updateObj.userpic = payload.userpic
      updateObj.position = payload.position
      firebase.database().ref('hero').update(updateObj)
        .then(() => {
          commit('updateHero', payload)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },

  getters: {
    loadedHero (state) {
      return state.loadedHero
    }
  }

}
