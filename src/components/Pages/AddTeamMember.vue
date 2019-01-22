<template>
  <section>
    <v-container>
      <v-layout>
        <v-flex xs12>
          <form
            @submit.prevent="onPublish"
            @keydown.esc="onCancel"
            @keydown.enter="onPublish"
          >
            <v-card>
              <v-card-title class="primary">
                <h1 class="white--text">
                  <v-icon class="white--text">{{ pageIcon }}</v-icon>
                  {{ pageTitle }}
                </h1>
              </v-card-title>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs12 sm6>
                    <div class="pr-4">
                      <v-text-field
                        name="name"
                        label="Name"
                        id="name"
                        v-model="name"
                        :prepend-icon="nameIcon"
                      />
                      <v-text-field
                        name="position"
                        label="Position"
                        id="position"
                        v-model="position"
                        :prepend-icon="positionIcon"
                      />
                      <!-- <v-layout>
                        <v-checkbox v-model="photo" hide-details class="shrink mr-2"/>
                        <v-text-field
                          name="photo"
                          label="Photo"
                          id="photo"
                          v-model="photo"
                          :disabled="!photo"
                          :prepend-icon="photoIcon"
                        />
                      </v-layout> -->
                      <v-layout>
                        <!-- <v-checkbox v-model="quote" hide-details class="shrink mr-2"/> -->
                        <v-textarea
                          name="quote"
                          label="Quote (HTML)"
                          id="quote"
                          v-model="quote"
                          :prepend-icon="quoteIcon"
                        />
                      </v-layout>
                    </div>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-card>
                      <v-card-title class="light-blue lighten-1" v-if="name">
                        <h1 class="white--text">
                          <v-icon class="white--text">{{ nameIcon }}</v-icon>
                          {{ name }}
                        </h1>
                      </v-card-title>
                      <v-card-text>
                        <p v-if="position">
                          <v-icon>{{ positionIcon }}</v-icon>
                          {{ position }}
                        </p>
                        <p class="ImageContainer">
                          <croppa
                            v-model="croppa"
                            :width="240"
                            :height="360"
                            :quality="2"
                            :accept="'image/*'"
                            :canvas-color="'#ccc'"
                            initial-size="cover"
                            :zoom-speed="2"
                            :placeholder="'photo 240x360'"
                            :placeholder-font-size="16"
                            :placeholder-color="'rgba(0,0,0,.54)'"
                            :prevent-white-space="true"
                            :remove-button-size="40"
                            @file-type-mismatch="onFileTypeMismatch"
                            @file-choose="onFilePicked"
                          />
                        </p>
                        <p v-if="quote">
                          <v-icon>{{ quoteIcon }}</v-icon>
                          <span v-html="quote"/>
                        </p>
                      </v-card-text>
                    </v-card>
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
                  :disabled="!formIsValid"
                  type="submit"
                >Publish</v-btn>
              </v-card-actions>
            </v-card>
          </form>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        pageTitle: 'Add Team Member',
        pageIcon: 'mdi-account-plus',
        nameIcon: 'mdi-account-card-details',
        positionIcon: 'mdi-android-studio',
        photoIcon: 'mdi-image',
        quoteIcon: 'mdi-format-quote-close',
        name: '',
        position: '',
        photo: '',
        quote: '',
        image: null,
        filePicked: false,
        croppa: {}
      }
    },
    computed: {
      formIsValid () {
        return this.name !== '' && this.croppa.hasImage()
      }
    },
    methods: {
      onFilePicked () {
        this.filePicked = true
      },
      onFileTypeMismatch (file) {
        alert('This file is not valid. Please upload a valid file jpg/jpeg/png.')
      },
      onCancel () {
        this.$router.push('/team')
      },
      onPublish () {
        if (!this.formIsValid) {
          return
        }
        if (!this.croppa.hasImage()) {
          alert('No image to upload')
          return
        }
        this.croppa.generateBlob((blob) => {
          var file = new File([blob], 'name.jpeg', {
            lastModifiedDate: new Date(),
            type: 'image/jpeg'
          })
          const itemData = {
            name: this.name,
            position: this.position,
            photo: this.photo,
            quote: this.quote,
            image: file,
            date: new Date()
          }
          this.$store.dispatch('createTeamMember', itemData)
          this.$router.push('/team')
        }, 'image/jpeg', 0.8)
      }
    }
  }
</script>

<style>
  .croppa-container,
  .croppa-container canvas {
    width: 100% !important;
    height: auto !important;
  }

  .ImageContainer {
    max-width: 200px;
    position: relative;
  }
  .ImageContainer img {
    display: block;
    width: 100%;
    height: auto;
  }
</style>
