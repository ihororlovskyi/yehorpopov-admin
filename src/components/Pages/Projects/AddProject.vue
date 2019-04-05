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

                      <v-layout row wrap>
                        <v-flex xs12 sm6>
                          <v-text-field
                            label="Title"
                            v-model="title"
                            :prepend-icon="titleIcon"
                          />
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-checkbox
                            v-model="isPublished"
                            :label="`Is Published?: ${isPublished.toString()}`"
                            :prepend-icon="isPublishedIcon"
                          />
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field
                            label="Price"
                            v-model="price"
                            :prepend-icon="priceIcon"
                          />
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field
                            label="Kuula ID"
                            v-model="kullaId"
                            :prepend-icon="kullaIdIcon"
                          />
                        </v-flex>
                      </v-layout>
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
                      <v-layout row wrap>
                        <v-flex xs6 sm4>
                          <v-text-field
                            label="Page Color 1"
                            v-model="pageColor1"
                            :prepend-icon="heroColorIcon"
                          />
                        </v-flex>
                        <v-flex xs6 sm4>
                          <v-text-field
                            label="Page Color 2"
                            v-model="pageColor2"
                            :prepend-icon="heroColorIcon"
                          />
                        </v-flex>
                        <v-flex xs6 sm4>
                          <v-text-field
                            label="Page Color 3"
                            v-model="pageColor3"
                            :prepend-icon="heroColorIcon"
                          />
                        </v-flex>
                        <v-flex xs6 sm4>
                          <v-text-field
                            label="Page Color 4"
                            v-model="pageColor4"
                            :prepend-icon="heroColorIcon"
                          />
                        </v-flex>
                        <v-flex xs6 sm4>
                          <v-text-field
                            label="Page Color 5"
                            v-model="pageColor5"
                            :prepend-icon="heroColorIcon"
                          />
                        </v-flex>
                        <v-flex xs6 sm4>
                          <v-text-field
                            label="Page Color 6"
                            v-model="pageColor6"
                            :prepend-icon="heroColorIcon"
                          />
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-textarea
                            label="Description Hero 1 (HTML)"
                            v-model="description"
                            :prepend-icon="descriptionIcon"
                          />
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-textarea
                            label="Description Hero 2 (HTML)"
                            v-model="description"
                            :prepend-icon="descriptionIcon"
                          />
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-textarea
                            label="Description Plan (HTML)"
                            v-model="description"
                            :prepend-icon="descriptionIcon"
                          />
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-textarea
                            label="Description Feature 1 (HTML)"
                            v-model="description"
                            :prepend-icon="descriptionIcon"
                          />
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-textarea
                            label="Description Feature 2 (HTML)"
                            v-model="description"
                            :prepend-icon="descriptionIcon"
                          />
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-textarea
                            label="Description Feature 3 (HTML)"
                            v-model="description"
                            :prepend-icon="descriptionIcon"
                          />
                        </v-flex>
                      </v-layout>

                    </div>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-card>
                      <!-- <v-card-title class="light-blue lighten-1" v-if="title">
                        <h1 class="white--text">
                          <v-icon class="white--text">{{ titleIcon }}</v-icon>
                          {{ title }}
                        </h1>
                      </v-card-title> -->
                      <v-card-text>
                        <!-- <p v-if="price">
                          <v-icon>{{ priceIcon }}</v-icon>
                          {{ price }}
                        </p> -->
                        <div class="mb-2">
                          <div>imgCover:</div>
                          <div class="ImageContainer">
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
                          </div>
                        </div>
                        <div class="mb-2">
                          <div>imgSlide1:</div>
                        </div>
                        <div class="mb-2">
                          <div>imgSlide2:</div>
                        </div>
                        <div class="mb-2">
                          <div>imgSlide3:</div>
                        </div>
                        <div class="mb-2">
                          <div>imgSlide4:</div>
                        </div>
                        <div class="mb-2">
                          <div>imgPlan:</div>
                        </div>
                        <div class="mb-2">
                          <div>imgFeature1:</div>
                        </div>
                        <div class="mb-2">
                          <div>imgFeature2:</div>
                        </div>
                        <div class="mb-2">
                          <div>imgFeature3:</div>
                        </div>
                        <!-- <p v-if="description">
                          <v-icon>{{ descriptionIcon }}</v-icon>
                          <span v-html="description"/>
                        </p> -->
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
        title: '',
        titleIcon: 'mdi-format-title',
        isPublished: false,
        isPublishedIcon: 'mdi-eye-check',
        price: '',
        priceIcon: 'mdi-currency-usd',
        atHero: false,
        atHeroIcon: 'mdi-bat',
        heroColor: '#f2f2f2',
        pageColor1: '#f2f2f2',
        pageColor2: '#f2f2f2',
        pageColor3: '#f2f2f2',
        pageColor4: '#f2f2f2',
        pageColor5: '#f2f2f2',
        pageColor6: '#f2f2f2',
        heroColorIcon: 'mdi-palette',
        kullaId: '',
        kullaIdIcon: 'mdi-virtual-reality',
        descriptionHero1: '',
        descriptionHero2: '',
        descriptionPlan: '',
        descriptionFeature1: '',
        descriptionFeature2: '',
        descriptionFeature3: '',
        descriptionIcon: 'mdi-text-subject',
        imgSlide1: '',
        imgSlide2: '',
        imgSlide3: '',
        imgSlide4: '',
        imgPlan: '',
        imgFeature1: '',
        imgFeature2: '',
        imgFeature3: '',
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
            date: new Date(),
            isPublished: this.isPublished,
            price: this.price,
            atHero: this.atHero,
            heroColor: this.heroColor,
            pageColor1: this.pageColor1,
            pageColor2: this.pageColor2,
            pageColor3: this.pageColor3,
            pageColor4: this.pageColor4,
            pageColor5: this.pageColor5,
            pageColor6: this.pageColor6,
            kuulaId: this.kuulaId,
            descriptionHero1: this.descriptionHero1,
            descriptionHero2: this.descriptionHero2,
            descriptionPlan: this.descriptionPlan,
            descriptionFeature1: this.descriptionFeature1,
            descriptionFeature2: this.descriptionFeature2,
            descriptionFeature3: this.descriptionFeature3,
            image: file
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
