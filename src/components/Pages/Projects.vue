<template>
  <v-flex xs12>
    <v-card>
      <v-card-text>

        <v-container grid-list-md>
          <v-layout wrap>

            <v-flex xs12>
              <h1>Projects</h1>
            </v-flex>

            <v-flex xs12 v-if="userIsAdmin">
              <btn-add-project/>
            </v-flex>

            <v-flex xs12 v-if="loading">

              <v-progress-circular
                indeterminate
                :size="150"
                color="amber"
              />

            </v-flex>

            <v-layout wrap v-else>
              <list-item
                v-for="i in projects"
                :i="i"
                :key="i.id"
              />
            </v-layout>

          </v-layout>
        </v-container>

      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
  export default {
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      projects () {
        return this.$store.getters.loadedProjectsSortedByDate
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      currentUserId () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id
      },
      userIsAdmin () {
        if (this.currentUserId === '665sv19j78V9ian4OP3Uvy9hraF3') {
          return true
        }
      }
    }
  }
</script>

<style>
</style>
