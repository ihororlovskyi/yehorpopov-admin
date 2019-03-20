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
      item.name = payload.name
      item.isPublished = payload.isPublished
      item.position = payload.position
      item.photo = payload.photo
      item.quote = payload.quote
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
              name: obj[key].name,
              isPublished: obj[key].isPublished,
              position: obj[key].position,
              photo: obj[key].photo,
              quote: obj[key].quote,
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
        name: payload.name,
        isPublished: payload.isPublished,
        position: payload.position,
        photo: payload.photo,
        quote: payload.quote,
        date: payload.date.toISOString()
      }
      let photo
      let key
      firebase.database().ref('hiwItems').push(item)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('team/' + key + '/photo' + ext).put(payload.image)
        })
        .then(fileData => {
          photo = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('hiwItems').child(key).update({ photo: photo })
        })
        .then(() => {
          commit('createHiwItem', {
            ...item,
            photo: photo,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateHiwItem ({ commit }, payload) {
      const updateObj = {}
      updateObj.name = payload.name
      updateObj.isPublished = payload.isPublished
      updateObj.position = payload.position
      updateObj.quote = payload.quote
      let photo
      let key
      firebase.database().ref('hiwItems').child(payload.id).update(updateObj)
        .then((data) => {
          key = payload.id
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('team/' + key + '/photo' + ext).put(payload.image)
        })
        .then(fileData => {
          photo = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('hiwItems').child(key).update({ photo: photo })
        })
        .then(() => {
          commit('updateHiwItem', {
            ...updateObj,
            photo: photo,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteHiwItem ({ commit }, payload) {
      firebase.database().ref('hiwItems').child(payload.id).remove()
        .then(() => {
          const photo = payload.photo
          const extWithMeta = photo.slice(photo.lastIndexOf('.'))
          const ext = extWithMeta.slice(0, extWithMeta.lastIndexOf('?'))
          return firebase.storage().ref('team/' + payload.id + '/photo' + ext).delete()
        })
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
