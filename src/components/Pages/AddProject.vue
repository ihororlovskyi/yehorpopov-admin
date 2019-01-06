<template>
  <v-flex xs12 sm8 offset-sm2 lg6 offset-lg3>
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
            required
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
          <!-- <v-text-field
            name="imageUrl"
            label="Image Url"
            id="imageUrl"
            v-model="imageUrl"
          />
          <img
            v-if="imageUrl"
            :src="imageUrl"
            class="d-block"
            width="150"
          /> -->
          <croppa
            v-model="croppa"
            :width="540"
            :height="338"
            :quality="2"
            :accept="'image/*'"
            :canvas-color="'#ccc'"
            initial-size="contain"
            :zoom-speed="1"
            :placeholder="'Select or drag image'"
            :placeholder-font-size="16"
            :placeholder-color="'rgba(0,0,0,.54)'"
            :remove-button-size="40"
            @file-type-mismatch="onFileTypeMismatch"
            @file-choose="onFilePicked"
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
        imageUrl: '',
        filePicked: false,
        image: null,
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
