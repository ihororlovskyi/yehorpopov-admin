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
                  <v-btn large color="success" class="mx-0" :to="addSocialLinkBtn.url">
                    <v-icon left>{{ addSocialLinkBtn.icon }}</v-icon>
                    {{ addSocialLinkBtn.title }}
                  </v-btn>
                </v-flex>
                <v-flex xs12>
                  <v-list two-line>
                    <v-list-tile
                      v-for="i in loadedSocialLinksSortedByOld"
                      @click="onLoad(i.id)"
                      :key="i.id"
                      v-ripple
                    >
                      <v-list-tile-avatar>
                        <v-icon>{{ i.icon }}</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>
                          <v-icon v-if="i.isPublished" small color="green darken-3">mdi-eye</v-icon>
                          <v-icon v-else small color="yellow darken-3">mdi-eye-off</v-icon>
                          {{ i.title }}
                        </v-list-tile-title>
                        <v-list-tile-sub-title>{{ i.link }}</v-list-tile-sub-title>
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
          title: 'Social Links',
          icon: 'mdi-facebook'
        },
        addSocialLinkBtn: {
          title: 'Add Social Link',
          icon: 'mdi-plus',
          url: '/social/add-social-link'
        }
      }
    },
    computed: {
      loadedSocialLinksSortedByOld () {
        return this.$store.getters.loadedSocialLinksSortedByOld
      },
      userIsAdmin () {
        return this.$store.getters.userIsAdmin
      }
    },
    methods: {
      onLoad (id) {
        this.$router.push('/social/' + id)
      }
    }
  }
</script>

<style>
</style>
