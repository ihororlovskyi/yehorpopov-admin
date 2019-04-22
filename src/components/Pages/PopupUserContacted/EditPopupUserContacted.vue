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
                    label="img"
                    v-model="loadedPopupUserContacted.popupPhoto"
                    :prepend-icon="imageIcon"
                  />
                </v-flex>
                <v-flex xs12 sm6 md4 class="mb-4">
                  <v-img :src="loadedPopupUserContacted.popupPhoto" alt="popupPhoto" class="ml-4"/>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="popupPerson"
                    v-model="loadedPopupUserContacted.popupPerson"
                    :prepend-icon="descriptionIcon"
                  />
                </v-flex>

                <v-flex xs12>
                  <v-text-field
                    label="popupOrderTitle"
                    v-model="loadedPopupUserContacted.popupOrderTitle"
                    :prepend-icon="descriptionIcon"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    label="popupOrderMessage (HTML)"
                    v-model="loadedPopupUserContacted.popupOrderMessage"
                    :prepend-icon="descriptionIcon"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    label="popupOrderMessageThanks (HTML)"
                    v-model="loadedPopupUserContacted.popupOrderMessageThanks"
                    :prepend-icon="descriptionIcon"
                  />
                </v-flex>

                <v-flex xs12>
                  <v-text-field
                    label="popupDownloadTitle"
                    v-model="loadedPopupUserContacted.popupDownloadTitle"
                    :prepend-icon="descriptionIcon"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    label="popupDownloadMessage (HTML)"
                    v-model="loadedPopupUserContacted.popupDownloadMessage"
                    :prepend-icon="descriptionIcon"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    label="popupDownloadMessageThanks (HTML)"
                    v-model="loadedPopupUserContacted.popupDownloadMessageThanks"
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
          title: 'Edit Popup User Contacted',
          icon: 'mdi-pencil'
        },
        descriptionIcon: 'mdi-text-subject',
        imageIcon: 'mdi-image'
      }
    },
    computed: {
      loadedPopupUserContacted () {
        return this.$store.getters.loadedPopupUserContacted
      }
    },
    methods: {
      onCancel () {
        this.$router.push('/popup-user-contacted')
      },
      onSave () {
        this.$store.dispatch('updatePopupUserContacted', {
          popupPhoto: this.loadedPopupUserContacted.popupPhoto,
          popupPerson: this.loadedPopupUserContacted.popupPerson,
          popupOrderTitle: this.loadedPopupUserContacted.popupOrderTitle,
          popupOrderMessage: this.loadedPopupUserContacted.popupOrderMessage,
          popupOrderMessageThanks: this.loadedPopupUserContacted.popupOrderMessageThanks,
          popupDownloadTitle: this.loadedPopupUserContacted.popupDownloadTitle,
          popupDownloadMessage: this.loadedPopupUserContacted.popupDownloadMessage,
          popupDownloadMessageThanks: this.loadedPopupUserContacted.popupDownloadMessageThanks
        })
        this.$router.push('/popup-user-contacted')
      }
    }
  }
</script>

<style>
</style>
