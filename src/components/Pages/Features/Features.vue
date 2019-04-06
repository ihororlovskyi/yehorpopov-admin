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
                  <v-btn large color="success" class="mx-0" :to="addFeatureBtn.url">
                    <v-icon left>{{ addFeatureBtn.icon }}</v-icon>
                    {{ addFeatureBtn.title }}
                  </v-btn>
                </v-flex>
                <v-flex xs12>
                  <v-list two-line>
                    <v-list-tile
                      v-for="i in loadedFeaturesSortedByOld"
                      @click="onLoad(i.id)"
                      :key="i.id"
                      v-ripple
                    >
                      <v-list-tile-content>
                        <v-list-tile-title>
                          <v-icon v-if="i.isPublished" small color="green darken-3">mdi-eye</v-icon>
                          <v-icon v-else small color="yellow darken-3">mdi-eye-off</v-icon>
                          {{ i.title }}
                        </v-list-tile-title>
                        <v-list-tile-sub-title>{{ i.description }}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
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
          title: 'Features',
          icon: 'mdi-star'
        },
        addFeatureBtn: {
          title: 'Add Feature',
          icon: 'mdi-account-plus',
          url: '/features/add-feature'
        }
      }
    },
    computed: {
      loadedFeaturesSortedByOld () {
        return this.$store.getters.loadedFeaturesSortedByOld
      },
      userIsAdmin () {
        return this.$store.getters.userIsAdmin
      }
    },
    methods: {
      onLoad (id) {
        this.$router.push('/features/' + id)
      }
    }
  }
</script>

<style>
</style>
