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
                  <v-btn large color="warning" class="mx-0" :to="editAboutWidgetBtn.url">
                    <v-icon left>{{ editAboutWidgetBtn.icon }}</v-icon>
                    {{ editAboutWidgetBtn.title }}
                  </v-btn>
                </v-flex>

                <v-flex xs12 sm6 md4 class="mb-4" v-if="loadedPopupUserContacted.popupPhoto">
                  <div><b>popupPhoto:</b></div>
                  <v-img :src="loadedPopupUserContacted.popupPhoto" alt="popupPhoto"/>
                </v-flex>
                <v-flex xs12 class="mb-4" v-if="loadedPopupUserContacted.popupPerson">
                  <div><b>popupPerson:</b></div>
                  <div>{{ loadedPopupUserContacted.popupPerson }}</div>
                </v-flex>

                <v-flex xs12 class="mb-4" v-if="loadedPopupUserContacted.popupOrderTitle">
                  <div><b>popupOrderTitle:</b></div>
                  <div>{{ loadedPopupUserContacted.popupOrderTitle }}</div>
                </v-flex>
                <v-flex xs12 class="mb-4" v-if="loadedPopupUserContacted.popupOrderMessage">
                  <div><b>popupOrderMessage (HTML):</b></div>
                  <div><span v-html="loadedPopupUserContacted.popupOrderMessage"/></div>
                </v-flex>
                <v-flex xs12 class="mb-4" v-if="loadedPopupUserContacted.popupOrderMessageThanks">
                  <div><b>popupOrderMessageThanks (HTML):</b></div>
                  <div><span v-html="loadedPopupUserContacted.popupOrderMessageThanks"/></div>
                </v-flex>

                <!-- <v-flex xs12 class="mb-4" v-if="loadedPopupUserContacted.popupDownloadTitle">
                  <div><b>popupDownloadTitle:</b></div>
                  <div>{{ loadedPopupUserContacted.popupDownloadTitle }}</div>
                </v-flex>
                <v-flex xs12 class="mb-4" v-if="loadedPopupUserContacted.popupDownloadMessage">
                  <div><b>popupDownloadMessage (HTML):</b></div>
                  <div><span v-html="loadedPopupUserContacted.popupDownloadMessage"/></div>
                </v-flex>
                <v-flex xs12 class="mb-4" v-if="loadedPopupUserContacted.popupDownloadMessageThanks">
                  <div><b>popupDownloadMessageThanks (HTML):</b></div>
                  <div><span v-html="loadedPopupUserContacted.popupDownloadMessageThanks"/></div>
                </v-flex> -->

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
          title: 'Popup User Contacted',
          icon: 'mdi-message'
        },
        editAboutWidgetBtn: {
          title: 'Edit Popup',
          icon: 'mdi-pencil',
          url: '/popup-user-contacted/edit'
        }
      }
    },
    computed: {
      loadedPopupUserContacted () {
        return this.$store.getters.loadedPopupUserContacted
      },
      userIsAdmin () {
        return this.$store.getters.userIsAdmin
      }
    }
  }
</script>

<style>
</style>
