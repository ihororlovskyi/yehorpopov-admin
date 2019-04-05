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
                <v-flex xs12 sm6>
                  <div class="pr-4">

                    <v-layout row wrap>
                      <v-flex xs12 sm6>
                        <v-text-field
                          label="Title"
                          v-model="item.title"
                          :prepend-icon="titleIcon"
                        />
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-checkbox
                          v-model="item.isPublished"
                          :label="`Is Published?: ${item.isPublished.toString()}`"
                          :prepend-icon="isPublishedIcon"
                        />
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-text-field
                          label="Kulla Id"
                          v-model="item.kullaId"
                          :prepend-icon="kullaIdIcon"
                        />
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-text-field
                          label="Price"
                          v-model="item.price"
                          :prepend-icon="priceIcon"
                        />
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs6>
                        <v-checkbox
                          v-model="item.atHero"
                          :label="`Show at Hero?: ${item.atHero.toString()}`"
                          :prepend-icon="atHeroIcon"
                        />
                      </v-flex>
                      <v-flex xs6 v-if="item.atHero">
                        <v-text-field
                          label="Hero Color"
                          v-model="item.heroColor"
                          :prepend-icon="heroColorIcon"
                        />
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs6 sm4>
                        <v-text-field
                          label="Page Color 1"
                          v-model="item.pageColor1"
                          :prepend-icon="heroColorIcon"
                        />
                      </v-flex>
                      <v-flex xs6 sm4>
                        <v-text-field
                          label="Page Color 2"
                          v-model="item.pageColor2"
                          :prepend-icon="heroColorIcon"
                        />
                      </v-flex>
                      <v-flex xs6 sm4>
                        <v-text-field
                          label="Page Color 3"
                          v-model="item.pageColor3"
                          :prepend-icon="heroColorIcon"
                        />
                      </v-flex>
                      <v-flex xs6 sm4>
                        <v-text-field
                          label="Page Color 4"
                          v-model="item.pageColor4"
                          :prepend-icon="heroColorIcon"
                        />
                      </v-flex>
                      <v-flex xs6 sm4>
                        <v-text-field
                          label="Page Color 5"
                          v-model="item.pageColor5"
                          :prepend-icon="heroColorIcon"
                        />
                      </v-flex>
                      <v-flex xs6 sm4>
                        <v-text-field
                          label="Page Color 6"
                          v-model="item.pageColor6"
                          :prepend-icon="heroColorIcon"
                        />
                      </v-flex>
                    </v-layout>
                    <!-- <v-text-field
                      label="imgCover"
                      v-model="item.imgCover"
                      :prepend-icon="imgCoverIcon"
                    /> -->
                    <v-layout row wrap>
                      <v-flex xs12 sm6>
                        <v-textarea
                          label="Description Hero 1 (HTML)"
                          v-model="item.descriptionHero1"
                          :prepend-icon="descriptionIcon"
                        />
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-textarea
                          label="Description Hero 2 (HTML)"
                          v-model="item.descriptionHero2"
                          :prepend-icon="descriptionIcon"
                        />
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-textarea
                          label="Description Plan (HTML)"
                          v-model="item.descriptionPlan"
                          :prepend-icon="descriptionIcon"
                        />
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-textarea
                          label="Description Feature 1 (HTML)"
                          v-model="item.descriptionFeature1"
                          :prepend-icon="descriptionIcon"
                        />
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-textarea
                          label="Description Feature 2 (HTML)"
                          v-model="item.descriptionFeature2"
                          :prepend-icon="descriptionIcon"
                        />
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-textarea
                          label="Description Feature 3 (HTML)"
                          v-model="item.descriptionFeature3"
                          :prepend-icon="descriptionIcon"
                        />
                      </v-flex>
                    </v-layout>
                  </div>

                </v-flex>
                <v-flex xs12 sm6>
                  <v-card>
                    <!-- <v-card-title class="light-blue lighten-1">
                      <h1 class="white--text">
                        <v-icon class="white--text">{{ titleIcon }}</v-icon>
                        {{ item.title }}
                      </h1>
                      <v-spacer/>

                    </v-card-title> -->
                    <v-card-text>
                      <!-- <p>
                        <v-icon>{{ priceIcon }}</v-icon>
                        {{ item.price }}
                      </p> -->
                      <div class="mb-2">
                        <div>imgCover:</div>
                        <div class="ImageContainer">
                          <div v-if="photoIsVisible">
                            <v-img :src="item.imgCover"/>
                            <v-btn
                              small
                              fab
                              class="error BtnClosePhoto"
                              @click="onClosePhoto"
                            >
                              <v-icon large>mdi-close</v-icon>
                            </v-btn>
                          </div>
                          <div v-else>
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
                            />
                          </div>
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
                      <!-- <p>
                        <v-icon>{{ descriptionIcon }}</v-icon>
                        <span v-html="item.description"/>
                      </p> -->
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-dialog v-model="deleteTicketDialog" max-width="440">
                <v-tooltip
                  top
                  slot="activator"
                  color="error"
                  open-delay="0"
                >
                  <v-btn
                    fab
                    color="error"
                    slot="activator"
                    small
                    class="ma-0"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                  <span>Delete</span>
                </v-tooltip>
                <v-card>
                  <v-container pa-1>
                    <v-card-text pa-1 v-html="deleteText"/>
                    <v-card-actions>
                      <v-spacer/>
                      <v-btn @click.stop="deleteTicketDialog=false">Cancel</v-btn>
                      <v-btn color="error" @click="onDelete">Delete</v-btn>
                    </v-card-actions>
                  </v-container>
                </v-card>
              </v-dialog>
              <v-spacer/>
              <v-btn
                large
                @click="onCancel"
              >Cancel</v-btn>
              <v-btn
                color="primary"
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
    props: ['id'],
    data () {
      return {
        page: {
          title: 'Edit Project',
          icon: 'mdi-account-plus'
        },
        deleteText: 'This Project will be deleted permanently.<br>Are you sure you want to delete this Project?',
        deleteTicketDialog: false,
        titleIcon: 'mdi-format-title',
        isPublishedIcon: 'mdi-eye-check',
        priceIcon: 'mdi-currency-usd',
        atHeroIcon: 'mdi-bat',
        heroColorIcon: 'mdi-palette',
        descriptionIcon: 'mdi-text-subject',
        imgCoverIcon: 'mdi-image',
        kullaIdIcon: 'mdi-virtual-reality',
        photoIsVisible: true,
        image: null,
        croppa: {}
      }
    },
    computed: {
      item () {
        return this.$store.getters.loadedProject(this.id)
      }
    },
    methods: {
      onClosePhoto () {
        this.photoIsVisible = false
      },
      onFileTypeMismatch (file) {
        alert('This file is not valid. Please upload a valid file jpg/jpeg/png.')
      },
      onCancel () {
        this.$router.push('/projects')
      },
      onSave () {
        if (this.photoIsVisible) {
          this.$store.dispatch('updateProject', {
            id: this.item.id,
            title: this.item.title,
            price: this.item.price,
            atHero: this.item.atHero,
            heroColor: this.item.heroColor,
            isPublished: this.item.isPublished,
            imgCover: this.item.imgCover,
            pageColor1: this.item.pageColor1,
            pageColor2: this.item.pageColor2,
            pageColor3: this.item.pageColor3,
            pageColor4: this.item.pageColor4,
            pageColor5: this.item.pageColor5,
            pageColor6: this.item.pageColor6,
            descriptionHero1: this.item.descriptionHero1,
            descriptionHero2: this.item.descriptionHero2,
            descriptionPlan: this.item.descriptionPlan,
            descriptionFeature1: this.item.descriptionFeature1,
            descriptionFeature2: this.item.descriptionFeature2,
            descriptionFeature3: this.item.descriptionFeature3
          })
          this.$router.push('/projects')
        } else {
          if (!this.croppa.hasImage()) {
            alert('No image.')
            return
          } else {
            this.croppa.generateBlob((blob) => {
              var file = new File([blob], 'name.jpeg', {
                lastModifiedDate: new Date(),
                type: 'image/jpeg'
              })
              const itemData = {
                id: this.item.id,
                title: this.item.title,
                isPublished: this.item.isPublished,
                price: this.item.price,
                atHero: this.item.atHero,
                heroColor: this.item.heroColor,
                imgCover: this.item.imgCover,
                pageColor1: this.item.pageColor1,
                pageColor2: this.item.pageColor2,
                pageColor3: this.item.pageColor3,
                pageColor4: this.item.pageColor4,
                pageColor5: this.item.pageColor5,
                pageColor6: this.item.pageColor6,
                descriptionHero1: this.item.descriptionHero1,
                descriptionHero2: this.item.descriptionHero2,
                descriptionPlan: this.item.descriptionPlan,
                descriptionFeature1: this.item.descriptionFeature1,
                descriptionFeature2: this.item.descriptionFeature2,
                descriptionFeature3: this.item.descriptionFeature3,
                image: file,
                date: new Date()
              }
              this.$store.dispatch('updateProject', itemData)
            }, 'image/jpeg', 0.8)
          }
          this.$router.push('/projects')
        }
      },
      onDelete () {
        this.$store.dispatch('deleteProject', {
          id: this.item.id,
          imgCover: this.item.imgCover
        })
        this.$router.push('/projects')
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
  .ImageContainer .BtnClosePhoto {
    position: absolute !important;
    top: 0;
    right: 0;
    z-index: 20;
  }
  .ImageContainer .croppa-container canvas {
    width: 100% !important;
    height: auto !important;
  }
</style>
