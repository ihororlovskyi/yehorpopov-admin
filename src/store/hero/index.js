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
      state.loadedHero.quote = payload.quote
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
          const content = data.val()
          commit('setLoadedHero', content)
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
      updateObj.quote = payload.quote
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
