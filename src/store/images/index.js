import * as firebase from 'firebase'

export default {

  state: {
    loadedImages: []
  },

  mutations: {
    setLoadedImages (state, payload) {
      state.loadedImages = payload
    },
    uploadImage (state, payload) {
      state.loadedImages.push(payload)
    },
    updateImage (state, payload) {
      const item = state.loadedImages.find(item => {
        return item.id === payload.id
      })
      item.title = payload.title
      item.isPublished = payload.isPublished
      item.src = payload.src
      item.description = payload.description
    },
    deleteImage (state, payload) {
      const index = state.loadedImages.findIndex(item => {
        return item.id === payload
      })
      if (index !== -1) {
        state.loadedImages.splice(index, 1)
      }
    }
  },

  actions: {
    loadImages ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('images').once('value')
        .then((data) => {
          const items = []
          const obj = data.val()
          for (let key in obj) {
            items.push({
              id: key,
              title: obj[key].title,
              isPublished: obj[key].isPublished,
              description: obj[key].description,
              src: obj[key].src,
              date: obj[key].date
            })
          }
          commit('setLoadedImages', items)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    uploadImage ({ commit, getters }, payload) {
      const item = {
        title: payload.title,
        isPublished: payload.isPublished,
        description: payload.description,
        src: payload.src,
        date: payload.date.toISOString()
      }
      let key
      firebase.database().ref('images').push(item)
        .then((data) => {
          key = data.key
          return key
        })
        .then(() => {
          commit('uploadImage', {
            ...item,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateImage ({ commit }, payload) {
      const updateObj = {}
      updateObj.title = payload.title
      updateObj.isPublished = payload.isPublished
      updateObj.src = payload.src
      updateObj.description = payload.description
      firebase.database().ref('images').child(payload.id).update(updateObj)
        .then(() => {
          commit('updateImage', payload)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteImage ({ commit }, payload) {
      firebase.database().ref('images').child(payload.id).remove()
        .then(() => {
          commit('deleteImage', payload.id)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },

  getters: {
    loadedImages (state) {
      return state.loadedImages
    },
    loadedImagesSortedByOld (state, getters) {
      return getters.loadedImages.sort((itemA, itemB) => {
        return new Date(itemA.date) - new Date(itemB.date)
      })
    },
    loadedImagesSortedByNew (state, getters) {
      return getters.loadedImagesSortedByOld.reverse()
    },
    loadedImage (state) {
      return (itemId) => {
        return state.loadedImages.find((item) => {
          return item.id === itemId
        })
      }
    }
  }

}
