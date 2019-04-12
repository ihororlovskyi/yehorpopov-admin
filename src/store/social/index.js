import * as firebase from 'firebase'

export default {

  state: {
    loadedSocialLinks: []
  },

  mutations: {
    setLoadedSocialLinks (state, payload) {
      state.loadedSocialLinks = payload
    },
    createSocialLink (state, payload) {
      state.loadedSocialLinks.push(payload)
    },
    updateSocialLink (state, payload) {
      const item = state.loadedSocialLinks.find(item => {
        return item.id === payload.id
      })
      item.title = payload.title
      item.isPublished = payload.isPublished
      item.link = payload.link
      item.icon = payload.icon
    },
    deleteSocialLink (state, payload) {
      const index = state.loadedSocialLinks.findIndex(item => {
        return item.id === payload
      })
      if (index !== -1) {
        state.loadedSocialLinks.splice(index, 1)
      }
    }
  },

  actions: {
    loadSocialLinks ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('social').once('value')
        .then((data) => {
          const items = []
          const obj = data.val()
          for (let key in obj) {
            items.push({
              id: key,
              title: obj[key].title,
              isPublished: obj[key].isPublished,
              link: obj[key].link,
              icon: obj[key].icon,
              date: obj[key].date
            })
          }
          commit('setLoadedSocialLinks', items)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createSocialLink ({ commit, getters }, payload) {
      const item = {
        title: payload.title,
        isPublished: payload.isPublished,
        link: payload.link,
        icon: payload.icon,
        date: payload.date.toISOString()
      }
      let key
      firebase.database().ref('social').push(item)
        .then((data) => {
          key = data.key
          return key
        })
        .then(() => {
          commit('createSocialLink', {
            ...item,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateSocialLink ({ commit }, payload) {
      const updateObj = {}
      updateObj.title = payload.title
      updateObj.isPublished = payload.isPublished
      updateObj.link = payload.link
      updateObj.icon = payload.icon
      firebase.database().ref('social').child(payload.id).update(updateObj)
        .then(() => {
          commit('updateSocialLink', payload)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteSocialLink ({ commit }, payload) {
      firebase.database().ref('social').child(payload.id).remove()
        .then(() => {
          commit('deleteSocialLink', payload.id)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },

  getters: {
    loadedSocialLinks (state) {
      return state.loadedSocialLinks
    },
    loadedSocialLinksSortedByOld (state, getters) {
      return getters.loadedSocialLinks.sort((itemA, itemB) => {
        return new Date(itemA.date) - new Date(itemB.date)
      })
    },
    loadedSocialLinksSortedByNew (state, getters) {
      return getters.loadedSocialLinksSortedByOld.reverse()
    },
    loadedSocialLink (state) {
      return (itemId) => {
        return state.loadedSocialLinks.find((item) => {
          return item.id === itemId
        })
      }
    }
  }

}
