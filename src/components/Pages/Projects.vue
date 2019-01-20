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
                <v-flex xs12 v-if="userIsAdmin" class="mb-2">
                  <btn-add-project/>
                </v-flex>
                <v-flex xs12>
                  <!-- <v-layout row wrap>
                    <v-flex xs12 v-if="loading">
                      <v-progress-circular
                        indeterminate
                        :size="60"
                        color="black"
                      />
                    </v-flex>
                    <v-flex v-else xs12 sm6 lg3 v-for="i in projects" :key="i.id">
                      <v-card tile>
                        <v-card-media
                          v-if="i.imgCover"
                          height="200"
                          style="cursor: pointer"
                          @click="onLoadProject(i.id)"
                          v-ripple
                          :src="i.imgCover"
                        />
                        <v-card-text class="pa-2" style="font-size: 12px">
                          <b>{{ i.title }}</b><br>
                          <i>{{ i.price }}</i>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout> -->

                  <v-list two-line>
                    <v-list-tile
                      v-for="i in loadedProjectsSortedByDate"
                      @click="onLoadProject(i.id)"
                      :key="i.id"
                      v-ripple
                    >
                      <v-list-tile-avatar>
                        <img :src="i.imgCover">
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ i.title }}</v-list-tile-title>
                        <v-list-tile-sub-title>{{ i.price }}</v-list-tile-sub-title>
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
        pageTitle: 'Projects'
      }
    },
    computed: {
      // loading () {
      //   return this.$store.getters.loading
      // },
      loadedProjectsSortedByDate () {
        return this.$store.getters.loadedProjectsSortedByDate
      },
      userIsAdmin () {
        return this.$store.getters.userIsAdmin
      }
    },
    methods: {
      onLoadProject (id) {
        this.$router.push('/project/' + id)
      }
    }
  }
</script>

<style>
</style>
