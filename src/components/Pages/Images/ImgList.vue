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
                  <v-btn large color="success" class="mx-0" :to="addImageBtn.url">
                    <v-icon left>{{ addImageBtn.icon }}</v-icon>
                    {{ addImageBtn.title }}
                  </v-btn>
                </v-flex>

                <v-flex xs2
                  v-for="i in loadedImagesSortedByNew"
                  :key="i.id"
                  @click="onLoad(i.id)"
                  v-ripple
                  style="cursor:pointer"
                  class="pa-1"
                >
                  <v-card>
                    <v-img :src="i.imageUrl" :alt="i.id"/>
                  </v-card>
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
          title: 'Images',
          icon: 'mdi-image'
        },
        addImageBtn: {
          title: 'Upload Image',
          icon: 'mdi-image-plus',
          url: '/images/add'
        }
      }
    },
    computed: {
      loadedTeam () {
        return this.$store.getters.loadedImages
      },
      loadedImagesSortedByNew () {
        return this.$store.getters.loadedImagesSortedByNew
      },
      userIsAdmin () {
        return this.$store.getters.userIsAdmin
      }
    },
    methods: {
      onLoad (id) {
        this.$router.push('/images/' + id)
      }
    }
  }
</script>

<style>
</style>
