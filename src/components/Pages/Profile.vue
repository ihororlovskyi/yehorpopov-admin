<template>
  <section>
    <v-container>
      <v-layout>
        <v-flex xs12>
          <v-card>
            <v-card-title class="primary">
              <h1 class="white--text">{{ pageTitle }}</h1>
            </v-card-title>
            <v-card-text>
              <v-progress-circular
                v-if="loading"
                indeterminate
                :size="150"
                color="amber"
              />
              <div v-else>
                <h4>Your ID</h4>
                <p><i>{{ $store.getters.user.id }}</i></p>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn flat class="mx-0" @click="onLogout">
                <v-icon left>{{ logoutBtn.icon }}</v-icon>
                {{ logoutBtn.title }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        pageTitle: 'Profile',
        logoutBtn: {
          title: 'Exit',
          icon: 'mdi-exit-to-app'
        }
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/')
      }
    }
  }
</script>

<style>
</style>
