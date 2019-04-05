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
      item.price = payload.price
      item.atHero = payload.atHero
      item.heroColor = payload.heroColor
      item.pageColor1 = payload.pageColor1
      item.pageColor2 = payload.pageColor2
      item.pageColor3 = payload.pageColor3
      item.pageColor4 = payload.pageColor4
      item.pageColor5 = payload.pageColor5
      item.pageColor6 = payload.pageColor6
      item.kuulaId = payload.kuulaId
      item.descriptionHero1 = payload.descriptionHero1
      item.descriptionHero2 = payload.descriptionHero2
      item.descriptionPlan = payload.descriptionPlan
      item.descriptionFeature1 = payload.descriptionFeature1
      item.descriptionFeature2 = payload.descriptionFeature2
      item.descriptionFeature3 = payload.descriptionFeature3
      item.imgCover = payload.imgCover
      // item.imgSlide1 = payload.imgSlide1
      // item.imgSlide2 = payload.imgSlide2
      // item.imgSlide3 = payload.imgSlide3
      // item.imgSlide4 = payload.imgSlide4
      // item.imgPlan = payload.imgPlan
      // item.imgFeature1 = payload.imgFeature1
      // item.imgFeature2 = payload.imgFeature2
      // item.imgFeature3 = payload.imgFeature3
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
              date: obj[key].date,
              title: obj[key].title,
              isPublished: obj[key].isPublished,
              price: obj[key].price,
              atHero: obj[key].atHero,
              heroColor: obj[key].heroColor,
              pageColor1: obj[key].pageColor1,
              pageColor2: obj[key].pageColor2,
              pageColor3: obj[key].pageColor3,
              pageColor4: obj[key].pageColor4,
              pageColor5: obj[key].pageColor5,
              pageColor6: obj[key].pageColor6,
              kuulaId: obj[key].kuulaId,
              descriptionHero1: obj[key].descriptionHero1,
              descriptionHero2: obj[key].descriptionHero2,
              descriptionPlan: obj[key].descriptionPlan,
              descriptionFeature1: obj[key].descriptionFeature1,
              descriptionFeature2: obj[key].descriptionFeature2,
              descriptionFeature3: obj[key].descriptionFeature3,
              imgCover: obj[key].imgCover,
              imgSlide1: obj[key].imgSlide1,
              imgSlide2: obj[key].imgSlide2,
              imgSlide3: obj[key].imgSlide3,
              imgSlide4: obj[key].imgSlide4,
              imgPlan: obj[key].imgPlan,
              imgFeature1: obj[key].imgFeature1,
              imgFeature2: obj[key].imgFeature2,
              imgFeature3: obj[key].imgFeature3
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
        date: payload.date.toISOString(),
        isPublished: payload.isPublished,
        price: payload.price,
        atHero: payload.atHero,
        heroColor: payload.heroColor,
        pageColor1: payload.pageColor1,
        pageColor2: payload.pageColor2,
        pageColor3: payload.pageColor3,
        pageColor4: payload.pageColor4,
        pageColor5: payload.pageColor5,
        pageColor6: payload.pageColor6,
        kuulaId: payload.kuulaId,
        descriptionHero1: payload.descriptionHero1,
        descriptionHero2: payload.descriptionHero2,
        descriptionPlan: payload.descriptionPlan,
        descriptionFeature1: payload.descriptionFeature1,
        descriptionFeature2: payload.descriptionFeature2,
        descriptionFeature3: payload.descriptionFeature3
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
      updateObj.price = payload.price
      updateObj.atHero = payload.atHero
      updateObj.heroColor = payload.heroColor
      updateObj.pageColor1 = payload.pageColor1
      updateObj.pageColor2 = payload.pageColor2
      updateObj.pageColor3 = payload.pageColor3
      updateObj.pageColor4 = payload.pageColor4
      updateObj.pageColor5 = payload.pageColor5
      updateObj.pageColor6 = payload.pageColor6
      updateObj.kuulaId = payload.kuulaId
      updateObj.descriptionHero1 = payload.descriptionHero1
      updateObj.descriptionHero2 = payload.descriptionHero2
      updateObj.descriptionPlan = payload.descriptionPlan
      updateObj.descriptionFeature1 = payload.descriptionFeature1
      updateObj.descriptionFeature2 = payload.descriptionFeature2
      updateObj.descriptionFeature3 = payload.descriptionFeature3
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
