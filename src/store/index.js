import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import error from './error'
import hero from './hero'
import features from './features'
import projects from './projects'
import customProject from './customProject'
import team from './team'
import teamMembers from './teamMembers'
import social from './social'
import instaworks from './instaworks'
import contacts from './contacts'
import images from './images'
import loading from './loading'
import about from './about'
import hiwWidget from './hiwWidget'
import hiwItems from './hiwItems'
import popupUserContacted from './popupUserContacted'

Vue.use(Vuex)

export const store = new Vuex.Store({

  modules: {
    user,
    error,
    hero,
    features,
    projects,
    customProject,
    team,
    teamMembers,
    social,
    instaworks,
    contacts,
    images,
    loading,
    about,
    hiwWidget,
    hiwItems,
    popupUserContacted
  }

})
