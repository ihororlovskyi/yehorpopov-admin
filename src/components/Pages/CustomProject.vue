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
                  <v-btn large color="warning" class="mx-0" :to="editHeroBtn.url">
                    <v-icon left>{{ editHeroBtn.icon }}</v-icon>
                    {{ editHeroBtn.title }}
                  </v-btn>
                </v-flex>
                <v-flex xs12>
                  <p v-if="loadedCustomProject.widgetTitle">
                    <b>widgetTitle:</b>
                    <br>
                    {{ loadedCustomProject.widgetTitle }}
                  </p>
                  <p v-if="loadedCustomProject.description">
                    <b>description (HTML):</b>
                    <br>
                    <span v-html="loadedCustomProject.description"/>
                  </p>
                  <p v-if="loadedCustomProject.img">
                    <b>img:</b>
                    <br>
                    {{ loadedCustomProject.img }}
                  </p>
                  <p v-if="loadedCustomProject.prePriceText">
                    <b>prePriceText:</b>
                    <br>
                    {{ loadedCustomProject.prePriceText }}
                  </p>
                  <p v-if="loadedCustomProject.price">
                    <b>price:</b>
                    <br>
                    {{ loadedCustomProject.price }}
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
          title: 'Custom Project',
          icon: 'mdi-rocket'
        },
        editHeroBtn: {
          title: 'Edit Custom Project',
          icon: 'mdi-pencil',
          url: '/custom-project/edit'
        }
      }
    },
    computed: {
      loadedCustomProject () {
        return this.$store.getters.loadedCustomProject
      },
      userIsAdmin () {
        return this.$store.getters.userIsAdmin
      }
    }
  }
</script>

<style>
</style>
