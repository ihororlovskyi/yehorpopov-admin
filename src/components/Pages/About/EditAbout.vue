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
                    label="widgetTitle"
                    v-model="loadedAboutWidget.widgetTitle"
                    :prepend-icon="descriptionIcon"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-checkbox
                    v-model="loadedAboutWidget.widgetIsPublished"
                    :label="`Widget Is Published?: ${loadedAboutWidget.widgetIsPublished.toString()}`"
                    :prepend-icon="isPublishedIcon"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="img"
                    v-model="loadedAboutWidget.widgetImg"
                    :prepend-icon="imageIcon"
                  />
                </v-flex>
                <v-flex xs12 sm6 md4 class="mb-4">
                  <v-img :src="loadedAboutWidget.widgetImg" alt="About Image" class="ml-4"/>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    label="Description (HTML)"
                    v-model="loadedAboutWidget.widgetDescription"
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
          title: 'Edit About',
          icon: 'mdi-mushroom'
        },
        descriptionIcon: 'mdi-text-subject',
        imageIcon: 'mdi-image'
      }
    },
    computed: {
      loadedAboutWidget () {
        return this.$store.getters.loadedAboutWidget
      }
    },
    methods: {
      onCancel () {
        this.$router.push('/about')
      },
      onSave () {
        this.$store.dispatch('updateAboutWidget', {
          widgetTitle: this.loadedAboutWidget.widgetTitle,
          widgetIsPublished: this.loadedAboutWidget.widgetIsPublished,
          widgetDescription: this.loadedAboutWidget.widgetDescription,
          widgetImg: this.loadedAboutWidget.widgetImg
        })
        this.$router.push('/about')
      }
    }
  }
</script>

<style>
</style>
