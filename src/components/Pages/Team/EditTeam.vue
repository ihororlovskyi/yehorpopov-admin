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
                    name="widgetTitle"
                    label="Widget Title"
                    id="widgetTitle"
                    v-model="loadedTeam.widgetTitle"
                    :prepend-icon="descriptionIcon"
                  />
                  <v-checkbox
                    v-model="loadedTeam.widgetIsPublished"
                    :label="`Widget Is Published?: ${loadedTeam.widgetIsPublished.toString()}`"
                    :prepend-icon="isPublishedIcon"
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
        descriptionIcon: 'mdi-text-subject',
        isPublishedIcon: 'mdi-eye-check'
      }
    },
    computed: {
      loadedTeam () {
        return this.$store.getters.loadedTeam
      }
    },
    methods: {
      onCancel () {
        this.$router.push('/team')
      },
      onSave () {
        this.$store.dispatch('updateTeam', {
          widgetTitle: this.loadedTeam.widgetTitle,
          widgetIsPublished: this.loadedTeam.widgetIsPublished
        })
        this.$router.push('/team')
      }
    }
  }
</script>

<style>
</style>
