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
                  <v-btn large color="warning" class="mx-0" :to="editContactsBtn.url">
                    <v-icon left>{{ editContactsBtn.icon }}</v-icon>
                    {{ editContactsBtn.title }}
                  </v-btn>
                </v-flex>
                <v-flex xs12>
                  <p v-if="loadedContacts.title">
                    <b>title:</b>
                    <br>
                    {{ loadedContacts.title }}
                  </p>
                  <p v-if="loadedContacts.phone">
                    <b>phone:</b>
                    <br>
                    {{ loadedContacts.phone }}
                  </p>
                  <p v-if="loadedContacts.email">
                    <b>email:</b>
                    <br>
                    {{ loadedContacts.email }}
                  </p>
                  <p v-if="loadedContacts.mapLocation">
                    <b>mapLocation:</b>
                    <br>
                    {{ loadedContacts.mapLocation }}
                  </p>
                  <p v-if="loadedContacts.address">
                    <b>address:</b>
                    <br>
                    <span v-html="loadedContacts.address"/>
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
          title: 'Contacts',
          icon: 'mdi-google-maps'
        },
        editContactsBtn: {
          title: 'Edit Contacts',
          icon: 'mdi-pencil',
          url: '/contacts/edit'
        }
      }
    },
    computed: {
      loadedContacts () {
        return this.$store.getters.loadedContacts
      },
      userIsAdmin () {
        return this.$store.getters.userIsAdmin
      }
    }
  }
</script>

<style>
</style>
