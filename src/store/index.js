import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import error from './error'
import projects from './projects'
import loading from './loading'

Vue.use(Vuex)

export const store = new Vuex.Store({

  modules: {
    user: user,
    error: error,
    projects: projects,
    loading: loading
  }

})
