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
              <v-layout row wrap>
                <v-flex xs12>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </v-flex>
              </v-layout>
            </v-card-text>
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
        pageTitle: 'Hero'
      }
    }
    // computed: {
    //   loading () {
    //     return this.$store.getters.loading
    //   },
    //   projects () {
    //     return this.$store.getters.loadedProjectsSortedByDate
    //   },
    //   userIsAdmin () {
    //     return this.$store.getters.userIsAdmin
    //   }
    // },
    // methods: {
    //   onLoadProject (id) {
    //     this.$router.push('/project/' + id)
    //   }
    // }
  }
</script>

<style>
</style>
