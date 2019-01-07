<template>
  <v-flex xs12>
    <v-card>
      <v-card-text>

        <v-container>
          <v-layout row wrap>

            <v-flex xs12>
              <h1>Projects</h1>
            </v-flex>

            <v-flex xs12 v-if="userIsAdmin">
              <btn-add-project/>
            </v-flex>

            <v-flex xs12>

              <v-layout row wrap>
                <v-flex xs12 v-if="loading">
                  <v-progress-circular
                    indeterminate
                    :size="60"
                    color="black"
                  />
                </v-flex>
                <v-flex v-else xs12 sm6 md3 v-for="i in projects" :key="i.id">
                  <v-card tile>
                    <v-card-media
                      height="200"
                      style="cursor: pointer"
                      @click="onLoadProject(i.id)"
                      v-ripple
                      :src="i.imgSlider"
                    />
                    <v-card-text class="pa-2" style="font-size: 12px">
                      <b>{{ i.title }}</b><br>
                      <i>{{ i.price }}</i>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
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
      loading () {
        return this.$store.getters.loading
      },
      projects () {
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
