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
                  <v-btn large color="warning" class="mx-0" :to="editTeamBtn.url">
                    <v-icon left>{{ editTeamBtn.icon }}</v-icon>
                    {{ editTeamBtn.title }}
                  </v-btn>
                </v-flex>
                <v-flex xs12>
                  <p v-if="loadedHiwWidget.widgetTitle">
                    <b>Widget Title:</b>
                    <br>
                    {{ loadedHiwWidget.widgetTitle }}
                  </p>
                  <p>
                    <b>Widget Is Published:</b>
                    <br>
                    {{ loadedHiwWidget.widgetIsPublished }}
                  </p>
                </v-flex>
                <v-flex xs12 v-if="userIsAdmin" class="mb-2">
                  <v-btn large color="success" class="mx-0" :to="addTeamMemberBtn.url">
                    <v-icon left>{{ addTeamMemberBtn.icon }}</v-icon>
                    {{ addTeamMemberBtn.title }}
                  </v-btn>
                </v-flex>
                <v-flex xs12>
                  <v-list two-line>
                    <v-list-tile
                      v-for="i in loadedHiwItemsSortedByOld"
                      @click="onLoad(i.id)"
                      :key="i.id"
                      v-ripple
                    >
                      <v-list-tile-avatar>
                        <v-img :src="i.img" :alt="i.title"/>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>
                          <v-icon v-if="i.isPublished" small color="green darken-3">mdi-eye</v-icon>
                          <v-icon v-else small color="yellow darken-3">mdi-eye-off</v-icon>
                          {{ i.title }}
                        </v-list-tile-title>
                        <v-list-tile-sub-title>{{ i.description }}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
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
          title: 'How It Works',
          icon: 'mdi-format-list-numbered'
        },
        addTeamMemberBtn: {
          title: 'Add How It Works Item',
          icon: 'mdi-account-plus',
          url: '/hiw/add-item'
        },
        editTeamBtn: {
          title: 'Edit How It Works',
          icon: 'mdi-pencil',
          url: '/hiw/edit-widget'
        }
      }
    },
    computed: {
      loadedHiwWidget () {
        return this.$store.getters.loadedHiwWidget
      },
      loadedHiwItemsSortedByOld () {
        return this.$store.getters.loadedHiwItemsSortedByOld
      },
      userIsAdmin () {
        return this.$store.getters.userIsAdmin
      }
    },
    methods: {
      onLoad (id) {
        this.$router.push('/hiw/' + id)
      }
    }
  }
</script>

<style>
</style>
