import * as firebase from 'firebase'

export default {

  state: {
    loadedHiwItems: []
  },

  mutations: {
    setLoadedHiwItems (state, payload) {
      state.loadedHiwItems = payload
    },
    createHiwItem (state, payload) {
      state.loadedHiwItems.push(payload)
    },
    updateHiwItem (state, payload) {
      const item = state.loadedHiwItems.find(item => {
        return item.id === payload.id
      })
      item.title = payload.title
      item.isPublished = payload.isPublished
      item.img = payload.img
      item.description = payload.description
    },
    deleteHiwItem (state, payload) {
      const index = state.loadedHiwItems.findIndex(item => {
        return item.id === payload
      })
      if (index !== -1) {
        state.loadedHiwItems.splice(index, 1)
      }
    }
  },

  actions: {
    loadHiwItems ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('hiwItems').once('value')
        .then((data) => {
          const items = []
          const obj = data.val()
          for (let key in obj) {
            items.push({
              id: key,
              title: obj[key].title,
              isPublished: obj[key].isPublished,
              img: obj[key].img,
              description: obj[key].description,
              date: obj[key].date
            })
          }
          commit('setLoadedHiwItems', items)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createHiwItem ({ commit, getters }, payload) {
      const item = {
        title: payload.title,
        isPublished: payload.isPublished,
        img: payload.img,
        description: payload.description,
        date: payload.date.toISOString()
      }
      let key
      firebase.database().ref('hiwItems').push(item)
        .then((data) => {
          key = data.key
          return key
        })
        .then(() => {
          commit('createHiwItem', {
            ...item,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateHiwItem ({ commit }, payload) {
      const updateObj = {}
      updateObj.title = payload.title
      updateObj.isPublished = payload.isPublished
      updateObj.img = payload.img
      updateObj.description = payload.description
      firebase.database().ref('hiwItems').child(payload.id).update(updateObj)
        .then(() => {
          commit('updateFeature', payload)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteHiwItem ({ commit }, payload) {
      firebase.database().ref('hiwItems').child(payload.id).remove()
        .then(() => {
          commit('deleteHiwItem', payload.id)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },

  getters: {
    loadedHiwItems (state) {
      return state.loadedHiwItems
    },
    loadedHiwItemsSortedByOld (state, getters) {
      return getters.loadedHiwItems.sort((itemA, itemB) => {
        return new Date(itemA.date) - new Date(itemB.date)
      })
    },
    loadedHiwItemsSortedByNew (state, getters) {
      return getters.loadedHiwItemsSortedByOld.reverse()
    },
    loadedHiwItem (state) {
      return (itemId) => {
        return state.loadedHiwItems.find((item) => {
          return item.id === itemId
        })
      }
    }
  }

}
