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
                      <v-checkbox
                        v-model="isPublished"
                        :label="`Is Published?: ${isPublished.toString()}`"
                        :prepend-icon="isPublishedIcon"
                      />
                      <div>
                        <v-btn
                          @click="onPickFile"
                          class="ml-0"
                        >
                          <v-icon left>mdi-image</v-icon>
                          Choose Image
                        </v-btn>
                        <input
                          type="file"
                          style="display: none"
                          ref="fileInput"
                          accept="image/*"
                          @change="onFilePicked"
                        >
                      </div>
                      <v-card v-if="imageUrl" width="150">
                        <img
                          :src="imageUrl"
                          class="d-block mb-4"
                          width="150"
                        >
                      </v-card>
                      <v-text-field
                        name="src"
                        label="Image Src"
                        id="src"
                        v-model="src"
                        :prepend-icon="srcIcon"
                      />
                      <v-textarea
                        name="description"
                        label="Description (HTML)"
                        id="description"
                        v-model="description"
                        :prepend-icon="descriptionIcon"
                      />

                    </div>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-card>
                      <v-list two-line class="py-0">
                        <v-list-tile>
                          <v-list-tile-avatar v-if="imageUrl">
                            <v-img :src="imageUrl" :alt="title"/>
                          </v-list-tile-avatar>
                          <v-list-tile-avatar v-if="src">
                            <v-img :src="src" :alt="title"/>
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <v-list-tile-title>
                              <v-icon v-if="isPublished" small color="green darken-3">mdi-eye</v-icon>
                              <v-icon v-else small color="yellow darken-3">mdi-eye-off</v-icon>
                              <span v-if="title">{{ title }}</span>
                            </v-list-tile-title>
                            <v-list-tile-sub-title v-if="description">{{ description }}</v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-list>
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
          title: 'Upload Image',
          icon: 'mdi-image-plus'
        },
        title: '',
        titleIcon: 'mdi-format-title',
        isPublished: false,
        isPublishedIcon: 'mdi-eye-check',
        src: '',
        srcIcon: 'mdi-image',
        imageUrl: '',
        image: null,
        imageUrlIcon: 'mdi-image',
        description: '',
        descriptionIcon: 'mdi-text-subject'
      }
    },
    computed: {
      formIsValid () {
        return this.imageUrl !== ''
      }
    },
    methods: {
      onCancel () {
        this.$router.push('/images')
      },
      onPublish () {
        if (!this.formIsValid) {
          return
        }
        if (!this.image) {
          return
        }
        const itemData = {
          title: this.title,
          isPublished: this.isPublished,
          src: this.src,
          description: this.description,
          date: new Date()
        }
        this.$store.dispatch('uploadImage', itemData)
        this.$router.push('/images')
      },
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Фаил не валидный. Пожалуйста, загрузите валидный фаил')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      }
    }
  }
</script>

<style>
</style>
