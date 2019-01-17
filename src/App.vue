<template>
  <v-app>

    <v-toolbar dark class="black">

      <v-toolbar-items class="hidden-xs-only">

        <v-btn flat :to="btnList.home.url" exact>
          <v-icon>{{ btnList.home.icon }}</v-icon>
          <v-toolbar-title>{{ btnList.home.title }}</v-toolbar-title>
        </v-btn>

        <v-btn flat :to="btnList.projects.url">
          <v-icon left>{{ btnList.projects.icon }}</v-icon>
          <span>{{ btnList.projects.title }}</span>
        </v-btn>

      </v-toolbar-items>

      <v-spacer/>

      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up">
        <v-icon>mdi-menu</v-icon>
      </v-toolbar-side-icon>

      <v-toolbar-items class="hidden-xs-only">

        <v-btn flat v-if="userIsAuthenticated" :to="btnList.profile.url">
          <v-icon left>{{ btnList.profile.icon }}</v-icon>
          <span>{{ btnList.profile.title }}</span>
        </v-btn>

        <v-btn flat v-if="!userIsAuthenticated" :to="btnList.login.url">
          <v-icon left>{{ btnList.login.icon }}</v-icon>
          <span>{{ btnList.login.title }}</span>
        </v-btn>

        <v-btn flat v-if="!userIsAuthenticated" :to="btnList.register.url">
          <v-icon left>{{ btnList.register.icon }}</v-icon>
          <span>{{ btnList.register.title }}</span>
        </v-btn>

      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-container>
        <v-layout>
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>

    <v-navigation-drawer
      fixed
      temporary
      right
      v-model="sideNav"
    >
      <v-list dense class="pt-0">

        <v-list-tile :to="btnList.home.url">
          <v-list-tile-action>
            <v-icon>{{ btnList.home.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ btnList.home.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="userIsAuthenticated" :to="btnList.projects.url">
          <v-list-tile-action>
            <v-icon>{{ btnList.projects.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ btnList.projects.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="userIsAuthenticated" :to="btnList.profile.url">
          <v-list-tile-action>
            <v-icon>{{ btnList.profile.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ btnList.profile.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="!userIsAuthenticated" :to="btnList.login.url">
          <v-list-tile-action>
            <v-icon>{{ btnList.login.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ btnList.login.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="!userIsAuthenticated" :to="btnList.register.url">
          <v-list-tile-action>
            <v-icon>{{ btnList.register.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ btnList.register.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>

    <v-card flat tile dark class="grey darken-4">
      <v-card-text>
        <v-container>
          <v-layout wrap>
            <v-flex xs12 sm6>
              <div>Yehor Popov Studio &copy; {{ new Date().getFullYear() }} All Rights Reserved</div>
              <Network/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>

  </v-app>
</template>

<script>
  import Network from './components/Shared/Network.vue'

  export default {
    components: {
      Network
    },
    data () {
      return {
        sideNav: null,
        btnList: {
          home: {
            title: 'Yehor Popov',
            icon: 'mdi-firebase',
            url: '/'
          },
          profile: {
            title: 'Profile',
            icon: 'mdi-account',
            url: '/user/profile'
          },
          projects: {
            title: 'Projects',
            icon: 'mdi-cannabis',
            url: '/projects'
          },
          features: {
            title: 'Features',
            icon: 'mdi-cannabis',
            url: '/features'
          },
          login: {
            title: 'Sign In',
            icon: 'mdi-key',
            url: '/user/login'
          },
          register: {
            title: 'Registration',
            icon: 'mdi-account-plus',
            url: '/user/register'
          }
        }
      }
    },
    computed: {
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      // },
      // currentUserId () {
      //   if (!this.userIsAuthenticated) {
      //     return false
      //   }
      //   return this.$store.getters.user.id
      // },
      // userIsAdmin () {
      //   if (this.currentUserId === '665sv19j78V9ian4OP3Uvy9hraF3') {
      //     return true
      //   }
      }
    }
  }
</script>

<style>
</style>
