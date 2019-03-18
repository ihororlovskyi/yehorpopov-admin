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
                  <v-textarea
                    name="quote"
                    label="quote (HTML)"
                    id="quote"
                    v-model="loadedHero.quote"
                    :prepend-icon="descriptionIcon"
                  />
                  <v-text-field
                    name="person"
                    label="person"
                    id="person"
                    v-model="loadedHero.person"
                    :prepend-icon="descriptionIcon"
                  />
                  <v-text-field
                    name="userpic"
                    label="userpic"
                    id="userpic"
                    v-model="loadedHero.userpic"
                    :prepend-icon="descriptionIcon"
                  />
                  <v-text-field
                    name="position"
                    label="position"
                    id="position"
                    v-model="loadedHero.position"
                    :prepend-icon="descriptionIcon"
                  />
                </v-flex>

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
          title: 'Edit Hero',
          icon: 'mdi-bat'
        },
        descriptionIcon: 'mdi-text-subject'
      }
    },
    computed: {
      loadedHero () {
        return this.$store.getters.loadedHero
      }
    },
    methods: {
      onCancel () {
        this.$router.push('/hero')
      },
      onSave () {
        this.$store.dispatch('updateHero', {
          quote: this.loadedHero.quote,
          person: this.loadedHero.person,
          userpic: this.loadedHero.userpic,
          position: this.loadedHero.position
        })
        this.$router.push('/hero')
      }
    }
  }
</script>

<style>
</style>
