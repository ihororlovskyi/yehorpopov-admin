import * as firebase from 'firebase'

export default {

  state: {
    user: null,
    admins: [
      '665sv19j78V9ian4OP3Uvy9hraF3',
      'XHKP3OEJKJRFLy5NgddjnZRlUIA3',
      'o0G1xy1OJsSLqk6qAX45lxQz4Zh2'
    ]
  },

  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },

  actions: {
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredItems: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredItems: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoLogin ({commit}, payload) {
      commit('setUser', {
        id: payload.uid,
        registeredItems: []
      })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },

  getters: {
    user (state) {
      return state.user
    },
    userIsAuthenticated (state, getters) {
      return !!getters.user
    },
    currentUserId (state, getters) {
      if (!getters.userIsAuthenticated) {
        return false
      }
      return getters.user && getters.user.id
    },
    userIsAdmin (state, getters) {
      if (state.admins.findIndex((admin) => {
        return admin === getters.currentUserId
      }) === -1) {
        return false
      }
      return true
    }
  }

}
