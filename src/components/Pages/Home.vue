<template>
  <section>
    <v-container>
      <v-layout>
        <v-flex xs12>
          <v-card>
            <page-title :icon="page.icon" :title="page.title"/>
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
        page: {
          title: 'Admin',
          icon: 'mdi-security'
        }
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
