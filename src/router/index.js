import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Pages/Home'
import AddProject from '@/components/Pages/AddProject'
import EditProject from '@/components/Pages/EditProject'
import Register from '@/components/Pages/Register'
import Login from '@/components/Pages/Login'
import Profile from '@/components/Pages/Profile'
import Projects from '@/components/Pages/Projects'
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
      path: '/admin/add-project',
      name: 'AddProject',
      component: AddProject
    },
    {
      path: '/project/:id',
      name: 'EditProject',
      component: EditProject,
      props: true
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
      component: Profile
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
