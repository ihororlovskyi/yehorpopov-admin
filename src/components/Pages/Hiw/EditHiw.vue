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
                    v-model="loadedHiwWidget.widgetTitle"
                    :prepend-icon="descriptionIcon"
                  />
                  <v-checkbox
                    v-model="loadedHiwWidget.widgetIsPublished"
                    :label="`Widget Is Published?: ${loadedHiwWidget.widgetIsPublished.toString()}`"
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
          title: 'Edit How It Works',
          icon: 'mdi-format-list-numbered'
        },
        descriptionIcon: 'mdi-text-subject',
        isPublishedIcon: 'mdi-eye-check'
      }
    },
    computed: {
      loadedHiwWidget () {
        return this.$store.getters.loadedHiwWidget
      }
    },
    methods: {
      onCancel () {
        this.$router.push('/hiw')
      },
      onSave () {
        this.$store.dispatch('updateHiwWidget', {
          widgetTitle: this.loadedHiwWidget.widgetTitle,
          widgetIsPublished: this.loadedHiwWidget.widgetIsPublished
        })
        this.$router.push('/hiw')
      }
    }
  }
</script>

<style>
</style>
