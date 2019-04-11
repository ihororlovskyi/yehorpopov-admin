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
                <v-flex xs12 v-if="loadedAboutWidget.widgetTitle">
                  <p>
                    <b>Title:</b>
                    <br>
                    {{ loadedAboutWidget.widgetTitle }}
                  </p>
                </v-flex>
                <v-flex xs12 v-if="loadedAboutWidget.widgetIsPublished">
                  <p>
                    <b>Is Published:</b>
                    <br>
                    {{ loadedAboutWidget.widgetIsPublished }}
                  </p>
                </v-flex>
                <v-flex xs12 sm6 md4 class="mb-4" v-if="loadedAboutWidget.widgetImg">
                  <div><b>Img:</b></div>
                  <v-img :src="loadedAboutWidget.widgetImg" alt="Custom Project Image"/>
                </v-flex>
                <v-flex xs12 v-if="loadedAboutWidget.widgetDescription">
                  <p>
                    <b>Description (HTML):</b>
                    <br>
                    <span v-html="loadedAboutWidget.widgetDescription"/>
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
          title: 'About',
          icon: 'mdi-mushroom'
        },
        editAboutWidgetBtn: {
          title: 'Edit About',
          icon: 'mdi-pencil',
          url: '/about/edit'
        }
      }
    },
    computed: {
      loadedAboutWidget () {
        return this.$store.getters.loadedAboutWidget
      },
      userIsAdmin () {
        return this.$store.getters.userIsAdmin
      }
    }
  }
</script>

<style>
</style>
