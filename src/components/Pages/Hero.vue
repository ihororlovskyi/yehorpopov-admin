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
                  <v-btn large color="warning" class="mx-0" :to="editHeroBtn.url">
                    <v-icon left>{{ editHeroBtn.icon }}</v-icon>
                    {{ editHeroBtn.title }}
                  </v-btn>
                  <p v-if="loadedHero.messageHome">
                    <b>messageHome:</b>
                    <br>
                    {{ loadedHero.messageHome }}
                  </p>
                  <p v-if="loadedHero.messageZaglushka">
                    <b>messageZaglushka:</b>
                    <br>
                    {{ loadedHero.messageZaglushka }}
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
          title: 'Hero',
          icon: 'mdi-bat'
        },
        editHeroBtn: {
          title: 'Edit Hero',
          icon: 'mdi-pencil',
          url: '/edit-hero'
        }
      }
    },
    computed: {
      loadedHero () {
        return this.$store.getters.loadedHero
      }
    }
  }
</script>

<style>
</style>
