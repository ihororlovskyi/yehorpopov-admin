<template>
  <v-flex xs12>
    <v-card>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <h1>Admin</h1>
              <p v-if="userIsAdmin">You are an admin. You can edit content :)</p>
              <p v-else>You are not an admin. You cant edit content :(</p>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
  export default {
    computed: {
      userIsAdmin () {
        return this.$store.getters.userIsAdmin
      }
    }
  }
</script>

<style>
</style>
