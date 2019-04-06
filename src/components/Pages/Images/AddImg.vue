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

                  <v-flex xs12 v-if="userIsAdmin" class="mb-2">
                    <v-btn large color="success" class="mx-0" @click="onPickFile">
                      <v-icon left>{{ chooseImageBtn.icon }}</v-icon>
                      {{ chooseImageBtn.title }}
                    </v-btn>
                    <input
                      type="file"
                      style="display: none"
                      ref="fileInput"
                      accept="image/*"
                      @change="onFilePicked"
                    >
                  </v-flex>

                  <v-flex xs12 sm4 offset-sm4 v-if="imageUrl">
                    <v-card class="mb-4">
                      <v-img :src="imageUrl" alt="Upload Image"/>
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
        chooseImageBtn: {
          title: 'Choose File',
          icon: 'mdi-plus'
        },
        imageUrl: '',
        image: null
      }
    },
    computed: {
      userIsAdmin () {
        return this.$store.getters.userIsAdmin
      },
      formIsValid () {
        return this.imageUrl !== ''
      }
    },
    methods: {
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
      },
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
          image: this.image,
          date: new Date()
        }
        this.$store.dispatch('uploadImage', itemData)
        this.$router.push('/images')
      }
    }
  }
</script>

<style>
</style>
