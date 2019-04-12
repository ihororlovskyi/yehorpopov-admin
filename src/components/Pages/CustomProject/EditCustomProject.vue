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
                    v-model="loadedCustomProject.widgetTitle"
                    :prepend-icon="descriptionIcon"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    label="description (HTML)"
                    v-model="loadedCustomProject.description"
                    :prepend-icon="descriptionIcon"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="img"
                    v-model="loadedCustomProject.img"
                    :prepend-icon="imageIcon"
                  />
                </v-flex>
                <v-flex xs12 sm6 md4 class="mb-4">
                  <v-img :src="loadedCustomProject.img" alt="Custom Project Image" class="ml-4"/>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="prePriceText"
                    v-model="loadedCustomProject.prePriceText"
                    :prepend-icon="descriptionIcon"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="price"
                    v-model="loadedCustomProject.price"
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
          title: 'Edit Custom Project',
          icon: 'mdi-rocket'
        },
        descriptionIcon: 'mdi-text-subject',
        imageIcon: 'mdi-image'
      }
    },
    computed: {
      loadedImagesSortedByNew () {
        return this.$store.getters.loadedImagesSortedByNew
      },
      loadedCustomProject () {
        return this.$store.getters.loadedCustomProject
      }
    },
    methods: {
      onCancel () {
        this.$router.push('/custom-project')
      },
      onSave () {
        this.$store.dispatch('updateCustomProject', {
          widgetTitle: this.loadedCustomProject.widgetTitle,
          description: this.loadedCustomProject.description,
          img: this.loadedCustomProject.img,
          prePriceText: this.loadedCustomProject.prePriceText,
          price: this.loadedCustomProject.price
        })
        this.$router.push('/custom-project')
      }
    }
  }
</script>

<style>
</style>
