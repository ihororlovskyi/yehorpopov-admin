import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import error from './error'
import features from './features'
import projects from './projects'
import team from './team'
import loading from './loading'

Vue.use(Vuex)

export const store = new Vuex.Store({

  modules: {
    features: features,
    user: user,
    error: error,
    projects: projects,
    team: team,
    loading: loading
  }

})
