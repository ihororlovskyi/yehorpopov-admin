import * as firebase from 'firebase'

export default {

  state: {
    loadedTeamMembers: []
  },

  mutations: {
    setLoadedTeamMembers (state, payload) {
      state.loadedTeamMembers = payload
    },
    createTeamMember (state, payload) {
      state.loadedTeamMembers.push(payload)
    },
    updateTeamMember (state, payload) {
      const item = state.loadedTeamMembers.find(item => {
        return item.id === payload.id
      })
      item.name = payload.name
      item.isPublished = payload.isPublished
      item.position = payload.position
      item.photo = payload.photo
      item.quote = payload.quote
    },
    deleteTeamMember (state, payload) {
      const index = state.loadedTeamMembers.findIndex(item => {
        return item.id === payload
      })
      if (index !== -1) {
        state.loadedTeamMembers.splice(index, 1)
      }
    }
  },

  actions: {
    loadTeamMembers ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('teamMembers').once('value')
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
          commit('setLoadedTeamMembers', items)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createTeamMember ({ commit, getters }, payload) {
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
      firebase.database().ref('teamMembers').push(item)
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
          return firebase.database().ref('teamMembers').child(key).update({ photo: photo })
        })
        .then(() => {
          commit('createTeamMember', {
            ...item,
            photo: photo,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateTeamMember ({ commit }, payload) {
      const updateObj = {}
      updateObj.name = payload.name
      updateObj.isPublished = payload.isPublished
      updateObj.position = payload.position
      updateObj.quote = payload.quote
      let photo
      let key
      firebase.database().ref('teamMembers').child(payload.id).update(updateObj)
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
          return firebase.database().ref('teamMembers').child(key).update({ photo: photo })
        })
        .then(() => {
          commit('updateTeamMember', {
            ...updateObj,
            photo: photo,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteTeamMember ({ commit }, payload) {
      firebase.database().ref('teamMembers').child(payload.id).remove()
        .then(() => {
          const photo = payload.photo
          const extWithMeta = photo.slice(photo.lastIndexOf('.'))
          const ext = extWithMeta.slice(0, extWithMeta.lastIndexOf('?'))
          return firebase.storage().ref('team/' + payload.id + '/photo' + ext).delete()
        })
        .then(() => {
          commit('deleteTeamMember', payload.id)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },

  getters: {
    loadedTeamMembers (state) {
      return state.loadedTeamMembers
    },
    loadedTeamMembersSortedByOld (state, getters) {
      return getters.loadedTeamMembers.sort((itemA, itemB) => {
        return new Date(itemA.date) - new Date(itemB.date)
      })
    },
    loadedTeamMembersSortedByNew (state, getters) {
      return getters.loadedTeamMembersSortedByOld.reverse()
    },
    loadedTeamMember (state) {
      return (itemId) => {
        return state.loadedTeamMembers.find((item) => {
          return item.id === itemId
        })
      }
    }
  }

}
