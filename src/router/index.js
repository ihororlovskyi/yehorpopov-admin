import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Pages/Home'
import Register from '@/components/Pages/Register'
import Login from '@/components/Pages/Login'
import Profile from '@/components/Pages/Profile'
import Hero from '@/components/Pages/Hero'
import Features from '@/components/Pages/Features'

import Projects from '@/components/Pages/Projects'
import AddProject from '@/components/Pages/AddProject'
import EditProject from '@/components/Pages/EditProject'

import HowItWorks from '@/components/Pages/HowItWorks'
import Works from '@/components/Pages/Works'

import Team from '@/components/Pages/Team'
import AddTeamMember from '@/components/Pages/AddTeamMember'
import EditTeamMember from '@/components/Pages/EditTeamMember'

import Contacts from '@/components/Pages/Contacts'

import SocialLinks from '@/components/Pages/SocialLinks'
import AddSocialLink from '@/components/Pages/AddSocialLink'
import EditSocialLink from '@/components/Pages/EditSocialLink'

import PopupContact from '@/components/Pages/PopupContact'
import PopupThanks from '@/components/Pages/PopupThanks'

import AuthGuard from './auth-guard'
import AdminGuard from './admin-guard'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: AuthGuard
    },
    {
      path: '/user/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/user/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/hero',
      name: 'Hero',
      component: Hero,
      beforeEnter: AdminGuard
    },
    {
      path: '/features',
      name: 'Features',
      component: Features,
      beforeEnter: AdminGuard
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects,
      beforeEnter: AdminGuard
    },
    {
      path: '/projects/add-project',
      name: 'AddProject',
      component: AddProject,
      beforeEnter: AdminGuard
    },
    {
      path: '/projects/:id',
      name: 'EditProject',
      component: EditProject,
      props: true,
      beforeEnter: AdminGuard
    },
    {
      path: '/how-it-works',
      name: 'HowItWorks',
      component: HowItWorks,
      beforeEnter: AdminGuard
    },
    {
      path: '/works',
      name: 'Works',
      component: Works,
      beforeEnter: AdminGuard
    },
    {
      path: '/team',
      name: 'Team',
      component: Team,
      beforeEnter: AdminGuard
    },
    {
      path: '/team/add-team-member',
      name: 'AddTeamMember',
      component: AddTeamMember,
      beforeEnter: AdminGuard
    },
    {
      path: '/team/:id',
      name: 'EditTeamMember',
      component: EditTeamMember,
      props: true,
      beforeEnter: AdminGuard
    },
    {
      path: '/contacts',
      name: 'Contacts',
      component: Contacts,
      beforeEnter: AdminGuard
    },
    {
      path: '/social',
      name: 'SocialLinks',
      component: SocialLinks,
      beforeEnter: AdminGuard
    },
    {
      path: '/social/add-social-link',
      name: 'AddSocialLink',
      component: AddSocialLink,
      beforeEnter: AdminGuard
    },
    {
      path: '/social/:id',
      name: 'EditSocialLink',
      props: true,
      component: EditSocialLink,
      beforeEnter: AdminGuard
    },
    {
      path: '/popup-contact',
      name: 'PopupContact',
      component: PopupContact,
      beforeEnter: AdminGuard
    },
    {
      path: '/popup-thanks',
      name: 'PopupThanks',
      component: PopupThanks,
      beforeEnter: AdminGuard
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
