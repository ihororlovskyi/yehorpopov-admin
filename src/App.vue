<template>
  <v-app>

    <v-navigation-drawer
      width="250"
      dark
      v-model="drawer"
      fixed
      app
      class="blue-grey darken-4"
    >
      <v-list>

        <v-list-tile v-if="userIsAuthenticated" exact :to="home.url" v-ripple>
          <v-list-tile-action>
            <v-icon>{{ home.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ home.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider v-if="userIsAdmin"/>

        <!-- <v-subheader v-if="userIsAdmin">Modules</v-subheader>

        <v-list-tile
          v-if="userIsAdmin"
          v-for="i in modules"
          :key="i.url"
          :to="i.url"
          v-ripple
        >
          <v-list-tile-action>
            <v-icon>{{ i.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ i.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> -->

        <v-divider v-if="userIsAdmin"/>

        <v-subheader v-if="userIsAdmin">Widgets</v-subheader>

        <v-list-tile
          v-if="userIsAdmin"
          v-for="i in widgets"
          :key="i.url"
          :to="i.url"
          v-ripple
        >
          <v-list-tile-action>
            <v-icon>{{ i.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ i.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider v-if="userIsAdmin"/>

        <v-subheader v-if="userIsAdmin">Components</v-subheader>

        <v-list-tile
          v-if="userIsAdmin"
          v-for="i in components"
          :key="i.url"
          :to="i.url"
          v-ripple
        >
          <v-list-tile-action>
            <v-icon>{{ i.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ i.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider v-if="userIsAuthenticated"/>

        <v-list-tile v-if="userIsAuthenticated" :to="userMenu.profile.url" v-ripple>
          <v-list-tile-action>
            <v-icon>{{ userMenu.profile.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ userMenu.profile.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="!userIsAuthenticated" :to="userMenu.login.url" v-ripple>
          <v-list-tile-action>
            <v-icon>{{ userMenu.login.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ userMenu.login.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="!userIsAuthenticated" :to="userMenu.register.url" v-ripple>
          <v-list-tile-action>
            <v-icon>{{ userMenu.register.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ userMenu.register.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>

    <v-toolbar dense app dark class="blue-grey darken-4">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-lg-and-up">
        <v-icon>mdi-menu</v-icon>
      </v-toolbar-side-icon>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>

  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        home: {
          title: 'Admin',
          icon: 'mdi-security',
          url: '/'
        },
        userMenu: {
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
          }
        },
        modules: {
          images: {
            title: 'Images',
            icon: 'mdi-image',
            url: '/images'
          }
        },
        widgets: {
          hero: {
            title: 'Hero',
            icon: 'mdi-bat',
            url: '/hero'
          },
          features: {
            title: 'Features',
            icon: 'mdi-star',
            url: '/features'
          },
          projects: {
            title: 'Projects',
            icon: 'mdi-cannabis',
            url: '/projects'
          },
          customProject: {
            title: 'Custom Project',
            icon: 'mdi-rocket',
            url: '/custom-project'
          },
          howItWorks: {
            title: 'How It Works',
            icon: 'mdi-format-list-numbered',
            url: '/hiw'
          },
          instaworks: {
            title: 'Instaworks',
            icon: 'mdi-instagram',
            url: '/instaworks'
          },
          team: {
            title: 'Team',
            icon: 'mdi-account-group',
            url: '/team'
          },
          contacts: {
            title: 'Contacts',
            icon: 'mdi-google-maps',
            url: '/contacts'
          }
        },
        components: {
          socialLinks: {
            title: 'Social Links',
            icon: 'mdi-facebook',
            url: '/social'
          },
          popupContact: {
            title: 'Popup Contact [WIP]',
            icon: 'mdi-message',
            url: '/popup-contact'
          },
          popupThanks: {
            title: 'Popup Thanks [WIP]',
            icon: 'mdi-heart',
            url: '/popup-thanks'
          }
        }
      }
    },
    computed: {
      userIsAuthenticated () {
        return this.$store.getters.userIsAuthenticated
      },
      userIsAdmin () {
        return this.$store.getters.userIsAdmin
      }
    }
  }
</script>

<style>
</style>
