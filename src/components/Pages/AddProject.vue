<template>
  <v-flex xs12>
    <v-card>
      <v-card-text>
        <h1>Add Project</h1>
        <form @submit.prevent="onCreateProject">
          <v-text-field
            name="title"
            label="Title"
            id="title"
            v-model="title"
            required
          />
          <v-text-field
            name="slug"
            label="Slug"
            id="slug"
            v-model="slug"
          />
          <v-text-field
            name="shorttitle"
            label="Short Title"
            id="shorttitle"
            v-model="shorttitle"
          />
          <v-text-field
            name="description"
            label="Description"
            id="description"
            v-model="description"
            multi-line
          />
          <v-text-field
            name="price"
            label="Price"
            id="price"
            v-model="price"
          />
          <div>
            <croppa
              v-model="croppa"
              :width="250"
              :height="460"
              :quality="2"
              :accept="'image/*'"
              :canvas-color="'#ccc'"
              initial-size="cover"
              :zoom-speed="2"
              :placeholder="'homeTopImg 250x460'"
              :placeholder-font-size="16"
              :placeholder-color="'rgba(0,0,0,.54)'"
              :remove-button-size="40"
              @file-type-mismatch="onFileTypeMismatch"
              @file-choose="onFilePicked"
            />
          </div>
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
          <v-text-field
            name="imgSlider"
            label="imgSlider"
            id="imgSlider"
            v-model="imgSlider"
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
          />
          <img
            v-if="imgSlim"
            :src="imgSlim"
            class="d-block"
            width="150"
          />
          <v-btn
            class="ml-0"
            color="success"
            large
            :disabled="!formIsValid"
            type="submit"
          >
            <v-icon left>mdi-plus-box</v-icon>
            <span>Add Project</span>
          </v-btn>
        </form>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        slug: '',
        shorttitle: '',
        description: '',
        price: '',
        homeTopImg: '',
        imgSlider: '',
        imgSlim: '',
        image: null,
        filePicked: false,
        croppa: {}
      }
    },
    computed: {
      formIsValid () {
        return this.title !== '' && this.filePicked
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
            slug: this.slug,
            shorttitle: this.shorttitle,
            description: this.description,
            price: this.price,
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
</style>
