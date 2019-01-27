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
              <page-title :icon="page.icon" :title="page.title"/>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs12 sm6>
                    <div class="pr-4">
                      <v-text-field
                        name="title"
                        label="Title"
                        id="title"
                        v-model="title"
                        :prepend-icon="titleIcon"
                      />
                      <v-text-field
                        name="price"
                        label="Price"
                        id="price"
                        v-model="price"
                        :prepend-icon="priceIcon"
                      />
                      <v-layout row wrap>
                        <v-flex xs12 sm6>
                          <v-checkbox
                            v-model="atHero"
                            :label="`Show at Hero?: ${atHero.toString()}`"
                            :prepend-icon="atHeroIcon"
                          />
                        </v-flex>
                        <v-flex xs12 sm6 v-if="atHero">
                          <v-text-field
                            name="heroColor"
                            label="Hero Color"
                            id="heroColor"
                            v-model="heroColor"
                            :prepend-icon="heroColorIcon"
                          />
                        </v-flex>
                      </v-layout>
                      <v-textarea
                        name="description"
                        label="Description"
                        id="description"
                        v-model="description"
                        :prepend-icon="descriptionIcon"
                      />
                      <v-checkbox
                        v-model="isPublished"
                        :label="`Is Published?: ${isPublished.toString()}`"
                        :prepend-icon="isPublishedIcon"
                      />
                    </div>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-card>
                      <v-card-title class="light-blue lighten-1" v-if="title">
                        <h1 class="white--text">
                          <v-icon class="white--text">{{ titleIcon }}</v-icon>
                          {{ title }}
                        </h1>
                      </v-card-title>
                      <v-card-text>
                        <p v-if="price">
                          <v-icon>{{ priceIcon }}</v-icon>
                          {{ price }}
                        </p>
                        <p class="ImageContainer">
                          <croppa
                            v-model="croppa"
                            :width="800"
                            :height="600"
                            :quality="2"
                            :accept="'image/*'"
                            :canvas-color="'#ccc'"
                            initial-size="cover"
                            :zoom-speed="2"
                            :placeholder="'imgCover 800x600'"
                            :placeholder-font-size="64"
                            :placeholder-color="'rgba(0,0,0,.54)'"
                            :prevent-white-space="true"
                            :remove-button-size="40"
                            @file-type-mismatch="onFileTypeMismatch"
                            @file-choose="onFilePicked"
                          />
                        </p>
                        <p v-if="description">
                          <v-icon>{{ descriptionIcon }}</v-icon>
                          <span v-html="description"/>
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
        page: {
          title: 'Add Project',
          icon: 'mdi-plus'
        },
        titleIcon: 'mdi-format-title',
        priceIcon: 'mdi-currency-usd',
        atHeroIcon: 'mdi-bat',
        heroColorIcon: 'mdi-palette',
        descriptionIcon: 'mdi-text-subject',
        isPublishedIcon: 'mdi-eye-check-outline',
        title: '',
        description: '',
        price: '',
        atHero: false,
        heroColor: '#f2f2f2',
        isPublished: false,
        image: null,
        filePicked: false,
        croppa: {}
      }
    },
    computed: {
      formIsValid () {
        return this.title !== '' && this.croppa.hasImage()
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
        this.$router.push('/projects')
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
            title: this.title,
            description: this.description,
            price: this.price,
            atHero: this.atHero,
            heroColor: this.heroColor,
            isPublished: this.isPublished,
            image: file,
            date: new Date()
          }
          this.$store.dispatch('createProject', itemData)
          this.$router.push('/projects')
        }, 'image/jpeg', 0.8)
      }
    }
  }
</script>

<style>
  .ImageContainer {
    max-width: 200px;
    position: relative;
  }
  .ImageContainer img {
    display: block;
    width: 100%;
    height: auto;
  }
  .ImageContainer .croppa-container canvas {
    width: 100% !important;
    height: auto !important;
  }
</style>
