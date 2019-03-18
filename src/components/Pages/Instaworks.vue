<template>
  <section>
    <v-container>
      <v-layout>
        <v-flex xs12>
          <v-card>
            <page-title :icon="page.icon" :title="page.title"/>
            <v-card-text>
              <v-layout row wrap>

                <v-flex xs12 v-if="userIsAdmin" class="mb-2">
                  <v-btn large color="warning" class="mx-0" :to="EditInstaworksBtn.url">
                    <v-icon left>{{ EditInstaworksBtn.icon }}</v-icon>
                    {{ EditInstaworksBtn.title }}
                  </v-btn>
                  <p v-if="loadedInstaworks.title">
                    <b>title:</b>
                    <br>
                    {{ loadedInstaworks.title }}
                  </p>
                  <p v-if="loadedInstaworks.description">
                    <b>description:</b>
                    <br>
                    {{ loadedInstaworks.description }}
                  </p>
                  <p v-if="loadedInstaworks.access_token">
                    <b>access_token:</b>
                    <br>
                    {{ loadedInstaworks.access_token }}
                  </p>
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
          title: 'Instaworks',
          icon: 'mdi-instagram'
        },
        EditInstaworksBtn: {
          title: 'Edit Instaworks',
          icon: 'mdi-pencil',
          url: '/edit-instaworks'
        }
      }
    },
    computed: {
      loadedInstaworks () {
        return this.$store.getters.loadedInstaworks
      },
      userIsAdmin () {
        return this.$store.getters.userIsAdmin
      }
    }
  }
</script>

<style>
</style>
