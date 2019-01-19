<template>
  <section>
    <v-container>
      <v-layout>
        <v-flex xs12>
          <form @submit.prevent="onCreateProject">
            <v-card>
              <v-card-title class="primary">
                <h1 class="white--text">{{ pageTitle }}</h1>
              </v-card-title>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs4>
                    <v-text-field
                      name="title"
                      label="Title"
                      id="title"
                      v-model="title"
                      prepend-icon="mdi-format-title"
                    />
                    <v-text-field
                      name="shorttitle"
                      label="Short Title"
                      id="shorttitle"
                      v-model="shorttitle"
                      prepend-icon="mdi-alpha-t"
                    />
                    <v-text-field
                      name="slug"
                      label="Slug"
                      id="slug"
                      v-model="slug"
                      prepend-icon="mdi-link"
                    />
                    <v-text-field
                      name="price"
                      label="Price"
                      id="price"
                      v-model="price"
                      prepend-icon="mdi-currency-usd"
                    />
                    <v-checkbox
                      v-model="atHero"
                      :label="`Show at hero?: ${atHero.toString()}`"
                    />
                    <div>
                      <v-icon left>mdi-image</v-icon>
                      imgCover 800x600
                    </div>
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
                      :placeholder-font-size="32"
                      :placeholder-color="'rgba(0,0,0,.54)'"
                      :remove-button-size="40"
                      @file-type-mismatch="onFileTypeMismatch"
                      @file-choose="onFilePicked"
                    />
                    <!-- <div>
                      <croppa
                        v-model="croppa_imgSlider"
                        :width="800"
                        :height="600"
                        :quality="2"
                        :accept="'image/*'"
                        :canvas-color="'#ccc'"
                        initial-size="contain"
                        :zoom-speed="2"
                        :placeholder="'imgSlider 800x600'"
                        :placeholder-font-size="16"
                        :placeholder-color="'rgba(0,0,0,.54)'"
                        :remove-button-size="40"
                        @file-type-mismatch="onFileTypeMismatch"
                        @file-choose="onFilePicked"
                      />
                    </div> -->
                    <v-textarea
                      name="description"
                      label="Description"
                      id="description"
                      v-model="description"
                    />
                    <v-text-field
                      name="imgSlider"
                      label="imgSlider"
                      id="imgSlider"
                      v-model="imgSlider"
                      prepend-icon="mdi-image"
                    />
                    <img
                      v-if="imgSlider"
                      :src="imgSlider"
                      class="d-block"
                      width="150"
                    />
                    <!-- <div>
                      <croppa
                        v-model="croppa_imgSlim"
                        :width="1200"
                        :height="300"
                        :quality="2"
                        :accept="'image/*'"
                        :canvas-color="'#ccc'"
                        initial-size="contain"
                        :zoom-speed="2"
                        :placeholder="'imgSlim 1200x300'"
                        :placeholder-font-size="16"
                        :placeholder-color="'rgba(0,0,0,.54)'"
                        :remove-button-size="40"
                        @file-type-mismatch="onFileTypeMismatch"
                        @file-choose="onFilePicked"
                      />
                    </div> -->
                    <v-text-field
                      name="imgSlim"
                      label="imgSlim"
                      id="imgSlim"
                      v-model="imgSlim"
                      prepend-icon="mdi-image"
                    />
                    <img
                      v-if="imgSlim"
                      :src="imgSlim"
                      class="d-block"
                      width="150"
                    />
                  </v-flex>
                  <v-flex xs8>
                    <!-- <v-carousel>
                      <v-carousel-item
                        v-for="(item,i) in items"
                        :key="i"
                        :src="item.src"
                      />
                    </v-carousel> -->
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn
                  class="mx-0"
                  color="success"
                  large
                  :disabled="!formIsValid"
                  type="submit"
                >
                  <v-icon left>mdi-plus-box</v-icon>
                  <span>Add Project</span>
                </v-btn>
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
        pageTitle: 'Add Project',
        title: '',
        slug: '',
        shorttitle: '',
        description: '',
        price: '',
        atHero: false,
        imgSlider: '',
        imgSlim: '',
        image: null,
        filePicked: false,
        croppa: {}
        // items: [
        //   {
        //     src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
        //   },
        //   {
        //     src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
        //   },
        //   {
        //     src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
        //   },
        //   {
        //     src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        //   }
        // ]
      }
    },
    computed: {
      formIsValid () {
        return this.title !== ''
      }
    },
    methods: {
      onFilePicked () {
        this.filePicked = true
      },
      onFileTypeMismatch (file) {
        alert('Фаил не валидный. Пожалуйста, загрузите валидный фаил jpg/jpeg/png.')
      },
      onCreateProject () {
        if (!this.formIsValid) {
          return
        }
        // if (!this.croppa.hasImage()) {
        //   alert('No image to upload')
        //   return
        // }
        this.croppa.generateBlob((blob) => {
          var file = new File([blob], 'name.jpeg', {
            lastModifiedDate: new Date(),
            type: 'image/jpeg'
          })
          const itemData = {
            title: this.title,
            slug: this.slug,
            shorttitle: this.shorttitle,
            description: this.description,
            price: this.price,
            atHero: this.atHero,
            image: file,
            imgSlider: this.imgSlider,
            imgSlim: this.imgSlim,
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
  .croppa-container,
  .croppa-container canvas {
    width: 100% !important;
    height: auto !important;
  }
</style>
