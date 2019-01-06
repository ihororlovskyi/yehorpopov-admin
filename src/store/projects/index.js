import * as firebase from 'firebase'

export default {

  state: {
    loadedProjects: []
  },

  mutations: {
    setLoadedProjects (state, payload) {
      state.loadedProjects = payload
    },
    createProject (state, payload) {
      state.loadedProjects.push(payload)
    },
    updateProject (state, payload) {
      const item = state.loadedProjects.find(item => {
        return item.id === payload.id
      })
      item.title = payload.title
      item.slug = payload.slug
      item.shorttitle = payload.shorttitle
      item.description = payload.description
      item.price = payload.price
      item.imageUrl = payload.imageUrl
    },
    removeProject (state, payload) {
      const index = state.loadedProjects.findIndex(item => {
        return item.id === payload
      })
      if (index !== -1) {
        state.loadedProjects.splice(index, 1)
      }
    }
  },

  actions: {
    loadProjects ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('projects2').once('value')
        .then((data) => {
          const items = []
          const obj = data.val()
          for (let key in obj) {
            items.push({
              id: key,
              title: obj[key].title,
              slug: obj[key].slug,
              shorttitle: obj[key].shorttitle,
              description: obj[key].description,
              price: obj[key].price,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date
            })
          }
          commit('setLoadedProjects', items)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createProject ({ commit, getters }, payload) {
      const item = {
        title: payload.title,
        slug: payload.slug,
        shorttitle: payload.shorttitle,
        description: payload.description,
        price: payload.price,
        date: payload.date.toISOString()
      }
      let imageUrl
      let key
      firebase.database().ref('projects2').push(item)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('projects/' + key + ext).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('projects2').child(key).update({ imageUrl: imageUrl })
        })
        .then(() => {
          commit('createProject', {
            ...item,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateProjectData ({commit}, payload) {
      // commit('setLoading', true)
      const updateObj = {}
      updateObj.title = payload.title
      updateObj.slug = payload.slug
      updateObj.shorttitle = payload.shorttitle
      updateObj.description = payload.description
      updateObj.price = payload.price
      updateObj.imageUrl = payload.imageUrl
      firebase.database().ref('projects2').child(payload.id).update(updateObj)
        .then(() => {
          commit('updateProject', payload)
          // commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          // commit('setLoading', false)
        })
    },
    removeProject ({ commit }, payload) {
      // commit('setLoading', true)
      firebase.database().ref('projects2').child(payload.id).remove()
        .then(() => {
          const imageUrl = payload.imageUrl
          const extWithMeta = imageUrl.slice(imageUrl.lastIndexOf('.'))
          const ext = extWithMeta.slice(0, extWithMeta.lastIndexOf('?'))
          return firebase.storage().ref('projects/' + payload.id + ext).delete()
        })
        .then(() => {
          commit('removeProject', payload.id)
          // commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          // commit('setLoading', false)
        })
    }
  },

  getters: {
    loadedProjects (state) {
      return state.loadedProjects
    },
    loadedProjectsSortedByDate (state, getters) {
      return getters.loadedProjects.sort((itemA, itemB) => {
        return new Date(itemA.date) - new Date(itemB.date)
      }).reverse()
    },
    loadedProject (state) {
      return (itemId) => {
        return state.loadedProjects.find((item) => {
          return item.id === itemId
        })
      }
    }
  }

}
