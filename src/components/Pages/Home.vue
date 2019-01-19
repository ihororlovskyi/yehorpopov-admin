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
                  <p v-if="userIsAdmin">You are an admin. You can edit content :)</p>
                  <p v-else>You are not an admin. You cant edit content :(</p>
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
        pageTitle: 'Admin'
      }
    },
    computed: {
      userIsAdmin () {
        return this.$store.getters.userIsAdmin
      }
    }
  }
</script>

<style>
</style>
