import * as firebase from 'firebase'

export default {

  state: {
    loadedFeatures: []
  },

  mutations: {
    setLoadedFeatures (state, payload) {
      state.loadedFeatures = payload
    },
    createFeature (state, payload) {
      state.loadedFeatures.push(payload)
    },
    updateFeature (state, payload) {
      const item = state.loadedFeatures.find(item => {
        return item.id === payload.id
      })
      item.title = payload.title
      item.isPublished = payload.isPublished
      item.description = payload.description
    },
    deleteFeature (state, payload) {
      const index = state.loadedFeatures.findIndex(item => {
        return item.id === payload
      })
      if (index !== -1) {
        state.loadedFeatures.splice(index, 1)
      }
    }
  },

  actions: {
    loadFeatures ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('features').once('value')
        .then((data) => {
          const items = []
          const obj = data.val()
          for (let key in obj) {
            items.push({
              id: key,
              title: obj[key].title,
              isPublished: obj[key].isPublished,
              description: obj[key].description,
              date: obj[key].date
            })
          }
          commit('setLoadedFeatures', items)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createFeature ({ commit, getters }, payload) {
      const item = {
        title: payload.title,
        isPublished: payload.isPublished,
        description: payload.description,
        date: payload.date.toISOString()
      }
      let key
      firebase.database().ref('features').push(item)
        .then((data) => {
          key = data.key
          return key
        })
        .then(() => {
          commit('createFeature', {
            ...item,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateFeature ({ commit }, payload) {
      const updateObj = {}
      updateObj.title = payload.title
      updateObj.isPublished = payload.isPublished
      updateObj.description = payload.description
      firebase.database().ref('features').child(payload.id).update(updateObj)
        .then(() => {
          commit('updateFeature', payload)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteFeature ({ commit }, payload) {
      firebase.database().ref('features').child(payload.id).remove()
        .then(() => {
          commit('deleteFeature', payload.id)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },

  getters: {
    loadedFeatures (state) {
      return state.loadedFeatures
    },
    loadedFeaturesSortedByOld (state, getters) {
      return getters.loadedFeatures.sort((itemA, itemB) => {
        return new Date(itemA.date) - new Date(itemB.date)
      })
    },
    loadedFeaturesSortedByNew (state, getters) {
      return getters.loadedFeaturesSortedByOld.reverse()
    },
    loadedFeature (state) {
      return (itemId) => {
        return state.loadedFeatures.find((item) => {
          return item.id === itemId
        })
      }
    }
  }

}
