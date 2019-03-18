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
                    name="title"
                    label="title"
                    id="title"
                    v-model="loadedContacts.title"
                    :prepend-icon="descriptionIcon"
                  />
                  <v-text-field
                    name="email"
                    label="email"
                    id="email"
                    v-model="loadedContacts.email"
                    :prepend-icon="descriptionIcon"
                  />
                  <v-text-field
                    name="phone"
                    label="phone"
                    id="phone"
                    v-model="loadedContacts.phone"
                    :prepend-icon="descriptionIcon"
                  />
                  <v-text-field
                    name="mapLocation"
                    label="mapLocation"
                    id="mapLocation"
                    v-model="loadedContacts.mapLocation"
                    :prepend-icon="descriptionIcon"
                  />
                  <v-textarea
                    name="address"
                    label="address (HTML)"
                    id="address"
                    v-model="loadedContacts.address"
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
          title: 'Edit Contacts',
          icon: 'mdi-google-maps'
        },
        descriptionIcon: 'mdi-text-subject'
      }
    },
    computed: {
      loadedContacts () {
        return this.$store.getters.loadedContacts
      }
    },
    methods: {
      onCancel () {
        this.$router.push('/contacts')
      },
      onSave () {
        this.$store.dispatch('updateContacts', {
          title: this.loadedContacts.title,
          phone: this.loadedContacts.phone,
          email: this.loadedContacts.email,
          mapLocation: this.loadedContacts.mapLocation,
          address: this.loadedContacts.address
        })
        this.$router.push('/contacts')
      }
    }
  }
</script>

<style>
</style>
