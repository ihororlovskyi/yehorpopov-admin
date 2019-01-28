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
      item.isPublished = payload.isPublished
      item.description = payload.description
      item.price = payload.price
      item.atHero = payload.atHero
      item.heroColor = payload.heroColor
      item.imgCover = payload.imgCover
    },
    deleteProject (state, payload) {
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
      firebase.database().ref('projects').once('value')
        .then((data) => {
          const items = []
          const obj = data.val()
          for (let key in obj) {
            items.push({
              id: key,
              title: obj[key].title,
              isPublished: obj[key].isPublished,
              description: obj[key].description,
              price: obj[key].price,
              atHero: obj[key].atHero,
              heroColor: obj[key].heroColor,
              imgCover: obj[key].imgCover,
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
        isPublished: payload.isPublished,
        description: payload.description,
        price: payload.price,
        atHero: payload.atHero,
        heroColor: payload.heroColor,
        date: payload.date.toISOString()
      }
      let imgCover
      let key
      firebase.database().ref('projects').push(item)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('projects/' + key + '/imgCover' + ext).put(payload.image)
        })
        .then(fileData => {
          imgCover = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('projects').child(key).update({ imgCover: imgCover })
        })
        .then(() => {
          commit('createProject', {
            ...item,
            imgCover: imgCover,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateProject ({ commit }, payload) {
      const updateObj = {}
      updateObj.title = payload.title
      updateObj.isPublished = payload.isPublished
      updateObj.description = payload.description
      updateObj.price = payload.price
      updateObj.atHero = payload.atHero
      updateObj.heroColor = payload.heroColor
      let imgCover
      let key
      firebase.database().ref('projects').child(payload.id).update(updateObj)
        .then((data) => {
          key = payload.id
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('projects/' + key + '/imgCover' + ext).put(payload.image)
        })
        .then(fileData => {
          imgCover = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('projects').child(key).update({ imgCover: imgCover })
        })
        .then(() => {
          commit('updateProject', {
            ...updateObj,
            imgCover: imgCover,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteProject ({ commit }, payload) {
      firebase.database().ref('projects').child(payload.id).remove()
        .then(() => {
          const imgCover = payload.imgCover
          const extWithMeta = imgCover.slice(imgCover.lastIndexOf('.'))
          const ext = extWithMeta.slice(0, extWithMeta.lastIndexOf('?'))
          return firebase.storage().ref('projects/' + payload.id + '/imgCover' + ext).delete()
        })
        .then(() => {
          commit('deleteProject', payload.id)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },

  getters: {
    loadedProjects (state) {
      return state.loadedProjects
    },
    loadedProjectsSortedByOld (state, getters) {
      return getters.loadedProjects.sort((itemA, itemB) => {
        return new Date(itemA.date) - new Date(itemB.date)
      })
    },
    loadedProjectsSortedByNew (state, getters) {
      return getters.loadedProjectsSortedByOld.reverse()
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
