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

                  <v-btn large color="success" class="mx-0" :to="addProjectBtn.url">
                    <v-icon left>{{ addProjectBtn.icon }}</v-icon>
                    {{ addProjectBtn.title }}
                  </v-btn>

                </v-flex>
                <v-flex xs12>

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
        pageTitle: 'Projects',
        addProjectBtn: {
          title: 'Add Project',
          icon: 'mdi-plus-box',
          url: '/projects/add-project'
        }
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
        this.$router.push('/projects/' + id)
      }
    }
  }
</script>

<style>
</style>
