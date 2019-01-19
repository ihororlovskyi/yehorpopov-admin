<template>
  <v-app>

    <v-navigation-drawer
      width="250"
      dark
      persistent
      v-model="drawer"
      fixed
      app
      class="blue-grey darken-4"
    >
      <v-toolbar flat class="transparent" dense>
        <v-list>

          <v-list-tile v-if="userIsAuthenticated" exact :to="headerMenu.home.url" v-ripple>
            <v-list-tile-action>
              <v-icon>{{ headerMenu.home.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ headerMenu.home.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-if="userIsAuthenticated" :to="headerMenu.projects.url" v-ripple>
            <v-list-tile-action>
              <v-icon>{{ headerMenu.projects.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ headerMenu.projects.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-if="userIsAuthenticated" :to="headerMenu.features.url" v-ripple>
            <v-list-tile-action>
              <v-icon>{{ headerMenu.features.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ headerMenu.features.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider v-if="userIsAuthenticated"/>

          <v-list-tile v-if="userIsAuthenticated" :to="headerMenu.profile.url" v-ripple>
            <v-list-tile-action>
              <v-icon>{{ headerMenu.profile.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ headerMenu.profile.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-if="!userIsAuthenticated" :to="headerMenu.login.url" v-ripple>
            <v-list-tile-action>
              <v-icon>{{ headerMenu.login.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ headerMenu.login.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-if="!userIsAuthenticated" :to="headerMenu.register.url" v-ripple>
            <v-list-tile-action>
              <v-icon>{{ headerMenu.register.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ headerMenu.register.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

        </v-list>
      </v-toolbar>
    </v-navigation-drawer>

    <v-toolbar dense app dark class="blue-grey darken-4">

      <!-- <v-toolbar-items>
        <v-btn flat :to="headerMenu.home.url" exact>
          <v-icon>{{ headerMenu.home.icon }}</v-icon>
          <v-toolbar-title>{{ headerMenu.home.title }}</v-toolbar-title>
        </v-btn>
      </v-toolbar-items>

      <v-spacer/>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat :to="headerMenu.projects.url">
          <v-icon left>{{ headerMenu.projects.icon }}</v-icon>
          <span>{{ headerMenu.projects.title }}</span>
        </v-btn>
      </v-toolbar-items>

      <v-spacer/> -->

      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-lg-and-up">
        <v-icon>mdi-menu</v-icon>
      </v-toolbar-side-icon>

      <!-- <v-toolbar-items class="hidden-xs-only">

        <v-btn flat v-if="userIsAuthenticated" :to="headerMenu.profile.url">
          <v-icon left>{{ headerMenu.profile.icon }}</v-icon>
          <span>{{ headerMenu.profile.title }}</span>
        </v-btn>

        <v-btn flat v-if="!userIsAuthenticated" :to="headerMenu.login.url">
          <v-icon left>{{ headerMenu.login.icon }}</v-icon>
          <span>{{ headerMenu.login.title }}</span>
        </v-btn>

        <v-btn flat v-if="!userIsAuthenticated" :to="headerMenu.register.url">
          <v-icon left>{{ headerMenu.register.icon }}</v-icon>
          <span>{{ headerMenu.register.title }}</span>
        </v-btn>

      </v-toolbar-items> -->
    </v-toolbar>

    <v-content>
      <!-- <v-container>
        <v-layout> -->
          <router-view/>
        <!-- </v-layout>
      </v-container> -->
    </v-content>

    <!-- <v-navigation-drawer
      fixed
      temporary
      left
      v-model="sideNav"
    >
      <v-list dense class="pt-0">

        <v-list-tile :to="headerMenu.home.url">
          <v-list-tile-action>
            <v-icon>{{ headerMenu.home.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ headerMenu.home.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="userIsAuthenticated" :to="headerMenu.projects.url">
          <v-list-tile-action>
            <v-icon>{{ headerMenu.projects.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ headerMenu.projects.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="userIsAuthenticated" :to="headerMenu.profile.url">
          <v-list-tile-action>
            <v-icon>{{ headerMenu.profile.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ headerMenu.profile.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="!userIsAuthenticated" :to="headerMenu.login.url">
          <v-list-tile-action>
            <v-icon>{{ headerMenu.login.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ headerMenu.login.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="!userIsAuthenticated" :to="headerMenu.register.url">
          <v-list-tile-action>
            <v-icon>{{ headerMenu.register.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ headerMenu.register.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer> -->

    <!-- <v-card flat tile dark class="grey darken-4">
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
    </v-card> -->

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
        drawer: true,
        // miniVariant: false,
        // sideNav: null,
        headerMenu: {
          home: {
            title: 'Yehor Popov',
            icon: 'mdi-circle',
            url: '/'
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
            icon: 'mdi-alien',
            url: '/features'
          }
        }
      }
    },
    computed: {
      // userIsAuthenticated () {
      //   return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      // },
      userIsAuthenticated () {
        return this.$store.getters.userIsAuthenticated
      }
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
      // }
    }
  }
</script>

<style>
</style>
