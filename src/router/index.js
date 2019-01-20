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
import Contacts from '@/components/Pages/Contacts'
import AuthGuard from './auth-guard'

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
      beforeEnter: AuthGuard
    },
    {
      path: '/features',
      name: 'Features',
      component: Features,
      beforeEnter: AuthGuard
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects,
      beforeEnter: AuthGuard
    },
    {
      path: '/admin/add-project',
      name: 'AddProject',
      component: AddProject,
      beforeEnter: AuthGuard
    },
    {
      path: '/project/:id',
      name: 'EditProject',
      component: EditProject,
      props: true,
      beforeEnter: AuthGuard
    },
    {
      path: '/how-it-works',
      name: 'HowItWorks',
      component: HowItWorks,
      beforeEnter: AuthGuard
    },
    {
      path: '/works',
      name: 'Works',
      component: Works,
      beforeEnter: AuthGuard
    },
    {
      path: '/team',
      name: 'Team',
      component: Team,
      beforeEnter: AuthGuard
    },
    {
      path: '/contacts',
      name: 'Contacts',
      component: Contacts,
      beforeEnter: AuthGuard
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
