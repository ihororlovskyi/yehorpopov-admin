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
                    label="title"
                    v-model="loadedContacts.title"
                    :prepend-icon="descriptionIcon"
                  />
                  <v-text-field
                    label="phone"
                    v-model="loadedContacts.phone"
                    :prepend-icon="descriptionIcon"
                  />
                  <v-text-field
                    label="email"
                    v-model="loadedContacts.email"
                    :prepend-icon="descriptionIcon"
                  />
                  <!-- <v-textarea
                    name="address"
                    label="address (HTML)"
                    id="address"
                    v-model="loadedContacts.address"
                    :prepend-icon="descriptionIcon"
                  /> -->
                  <!-- <v-text-field
                    name="map.lat"
                    label="map.lat"
                    id="map.lat"
                    v-model="loadedContacts.mapLat"
                    :prepend-icon="descriptionIcon"
                  />
                  <v-text-field
                    name="map.lng"
                    label="map.lng"
                    id="map.lng"
                    v-model="loadedContacts.mapLng"
                    :prepend-icon="descriptionIcon"
                  />
                  <v-text-field
                    name="map.zoom"
                    label="map.zoom"
                    id="map.zoom"
                    v-model="loadedContacts.mapZoom"
                    :prepend-icon="descriptionIcon"
                  /> -->
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
          address: this.loadedContacts.address,
          mapLat: this.loadedContacts.mapLat,
          mapLng: this.loadedContacts.mapLng,
          mapZoom: this.loadedContacts.mapZoom
        })
        this.$router.push('/contacts')
      }
    }
  }
</script>

<style>
</style>
