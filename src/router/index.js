import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Pages/Home'

import Register from '@/components/Pages/User/Register'
import Login from '@/components/Pages/User/Login'
import Profile from '@/components/Pages/User/Profile'

import Projects from '@/components/Pages/Projects/Projects'
import AddProject from '@/components/Pages/Projects/AddProject'
import EditProject from '@/components/Pages/Projects/EditProject'

import Hiw from '@/components/Pages/Hiw/Hiw'
import HiwEditWidget from '@/components/Pages/Hiw/EditHiw'
import HiwAddItem from '@/components/Pages/Hiw/AddHiwItem'
import HiwEditItem from '@/components/Pages/Hiw/EditHiwItem'

import Team from '@/components/Pages/Team/Team'
import EditTeam from '@/components/Pages/Team/EditTeam'
import AddTeamMember from '@/components/Pages/Team/AddTeamMember'
import EditTeamMember from '@/components/Pages/Team/EditTeamMember'

import SocialLinks from '@/components/Pages/SocialLink/SocialLinks'
import AddSocialLink from '@/components/Pages/SocialLink/AddSocialLink'
import EditSocialLink from '@/components/Pages/SocialLink/EditSocialLink'

import Features from '@/components/Pages/Features/Features'
import AddFeature from '@/components/Pages/Features/AddFeature'
import EditFeature from '@/components/Pages/Features/EditFeature'

import Hero from '@/components/Pages/Hero/Hero'
import EditHero from '@/components/Pages/Hero/EditHero'

import CustomProject from '@/components/Pages/CustomProject/CustomProject'
import EditCustomProject from '@/components/Pages/CustomProject/EditCustomProject'

import Instaworks from '@/components/Pages/Instaworks/Instaworks'
import EditInstaworks from '@/components/Pages/Instaworks/EditInstaworks'

import Contacts from '@/components/Pages/Contacts/Contacts'
import EditContacts from '@/components/Pages/Contacts/EditContacts'

import PopupContact from '@/components/Pages/PopupContact'
import PopupThanks from '@/components/Pages/PopupThanks'

import AuthGuard from './auth-guard'
import AdminGuard from './admin-guard'

import ImgList from '@/components/Pages/Images/ImgList'
import AddImg from '@/components/Pages/Images/AddImg'
import EditImg from '@/components/Pages/Images/EditImg'

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
      path: '/hiw',
      name: 'Hiw',
      component: Hiw,
      beforeEnter: AdminGuard
    },
    {
      path: '/hiw/edit-widget',
      name: 'HiwEditWidget',
      component: HiwEditWidget,
      beforeEnter: AdminGuard
    },
    {
      path: '/hiw/add-item',
      name: 'HiwAddItem',
      component: HiwAddItem,
      beforeEnter: AdminGuard
    },
    {
      path: '/hiw/:id',
      name: 'HiwEditItem',
      props: true,
      component: HiwEditItem,
      beforeEnter: AdminGuard
    },
    {
      path: '/team',
      name: 'Team',
      component: Team,
      beforeEnter: AdminGuard
    },
    {
      path: '/team/edit',
      name: 'EditTeam',
      component: EditTeam,
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
      path: '/features',
      name: 'Features',
      component: Features,
      beforeEnter: AdminGuard
    },
    {
      path: '/features/add-feature',
      name: 'AddFeature',
      component: AddFeature,
      beforeEnter: AdminGuard
    },
    {
      path: '/features/:id',
      name: 'EditFeature',
      props: true,
      component: EditFeature,
      beforeEnter: AdminGuard
    },
    {
      path: '/hero',
      name: 'Hero',
      component: Hero,
      beforeEnter: AdminGuard
    },
    {
      path: '/custom-project',
      name: 'CustomProject',
      component: CustomProject,
      beforeEnter: AdminGuard
    },
    {
      path: '/custom-project/edit',
      name: 'EditCustomProject',
      component: EditCustomProject,
      beforeEnter: AdminGuard
    },
    {
      path: '/hero/edit',
      name: 'EditHero',
      component: EditHero,
      beforeEnter: AdminGuard
    },
    {
      path: '/instaworks',
      name: 'Instaworks',
      component: Instaworks,
      beforeEnter: AdminGuard
    },
    {
      path: '/instaworks/edit',
      name: 'EditInstaworks',
      component: EditInstaworks,
      beforeEnter: AdminGuard
    },
    {
      path: '/images',
      name: 'ImgList',
      component: ImgList,
      beforeEnter: AdminGuard
    },
    {
      path: '/images/add',
      name: 'AddImg',
      component: AddImg,
      beforeEnter: AdminGuard
    },
    {
      path: '/images/:id',
      name: 'EditImg',
      props: true,
      component: EditImg,
      beforeEnter: AdminGuard
    },
    {
      path: '/contacts',
      name: 'Contacts',
      component: Contacts,
      beforeEnter: AdminGuard
    },
    {
      path: '/contacts/edit',
      name: 'EditContacts',
      component: EditContacts,
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
