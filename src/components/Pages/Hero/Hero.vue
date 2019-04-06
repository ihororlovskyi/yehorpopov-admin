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
                  <p v-if="loadedHero.quote">
                    <b>quote:</b>
                    <br>
                    {{ loadedHero.quote }}
                  </p>
                  <p v-if="loadedHero.person">
                    <b>person:</b>
                    <br>
                    {{ loadedHero.person }}
                  </p>
                </v-flex>
                <v-flex xs12 sm6 md4 class="mb-4">
                  <div><b>userpic:</b></div>
                  <v-img :src="loadedHero.userpic" alt="Hero Userpic Image"/>
                </v-flex>
                <v-flex xs12>
                  <p v-if="loadedHero.position">
                    <b>position:</b>
                    <br>
                    {{ loadedHero.position }}
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
          url: '/hero/edit'
        }
      }
    },
    computed: {
      loadedHero () {
        return this.$store.getters.loadedHero
      },
      userIsAdmin () {
        return this.$store.getters.userIsAdmin
      }
    }
  }
</script>

<style>
</style>
