<template>
  <section
    @keydown.esc="onCancel"
    @keydown.enter="onSave"
  >
    <v-container>
      <v-layout>
        <v-flex xs12>
          <v-card>
            <page-title :icon="page.icon" :title="page.title"/>
            <v-card-text>
              <v-layout row wrap>

                <v-flex xs12>
                  <v-text-field
                    label="title"
                    v-model="loadedInstaworks.title"
                    :prepend-icon="descriptionIcon"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="description"
                    v-model="loadedInstaworks.description"
                    :prepend-icon="descriptionIcon"
                  />
                </v-flex>
                <!-- <v-flex xs12>
                  <v-text-field
                    label="access_token"
                    v-model="loadedInstaworks.access_token"
                    :prepend-icon="descriptionIcon"
                  />
                  <p>ihrororlovskyi: 176908350.1677ed0.3c30032e917a430e8d1f65eae2223b1e</p>
                  <p>yehor_reality: 9623749496.1677ed0.5cccdc1243a64052b555b888c62b7770</p>
                </v-flex> -->

              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                large
                @click="onCancel"
              >Cancel</v-btn>
              <v-btn
                color="success"
                large
                @click="onSave"
              >Save</v-btn>
            </v-card-actions>
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
          title: 'Edit Instaworks',
          icon: 'mdi-instagram'
        },
        descriptionIcon: 'mdi-text-subject'
      }
    },
    computed: {
      loadedInstaworks () {
        return this.$store.getters.loadedInstaworks
      }
    },
    methods: {
      onCancel () {
        this.$router.push('/instaworks')
      },
      onSave () {
        this.$store.dispatch('updateInstaworks', {
          title: this.loadedInstaworks.title,
          description: this.loadedInstaworks.description,
          access_token: this.loadedInstaworks.access_token
        })
        this.$router.push('/instaworks')
      }
    }
  }
</script>

<style>
</style>
