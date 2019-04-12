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

                <v-flex xs12 v-if="userIsAdmin" class="mb-2">
                  <v-btn large color="warning" class="mx-0" @click="onPickFile">
                    <v-icon left>{{ replaceImageBtn.icon }}</v-icon>
                    {{ replaceImageBtn.title }}
                  </v-btn>
                  <input
                    type="file"
                    style="display: none"
                    ref="fileInput"
                    accept="image/*"
                    @change="onFilePicked"
                  >
                </v-flex>

                <v-flex xs12 sm4 offset-sm4>
                  <v-card class="mb-4">
                    <v-img v-if="imageUrl" :src="imageUrl" :alt="item.id"/>
                    <v-img v-else :src="item.imageUrl" :alt="item.id"/>
                  </v-card>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Image Url"
                    v-model="item.imageUrl"
                    :prepend-icon="imageIcon"
                  />
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
                color="success"
                large
                :disabled="!formIsValid"
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
          title: 'Edit Image',
          icon: 'mdi-pencil'
        },
        deleteText: 'This Image will be deleted permanently.<br>Are you sure you want to delete this Image?',
        deleteTicketDialog: false,
        imageIcon: 'mdi-link',
        replaceImageBtn: {
          title: 'Replaсe Image',
          icon: 'mdi-image-plus'
        },
        imageUrl: '',
        image: null
      }
    },
    computed: {
      userIsAdmin () {
        return this.$store.getters.userIsAdmin
      },
      item () {
        return this.$store.getters.loadedImage(this.id)
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
      onSave () {
        if (!this.formIsValid) {
          return
        }
        if (!this.image) {
          return
        }
        this.$store.dispatch('updateImage', {
          id: this.item.id,
          // imageUrl: this.imageUrl
          image: this.image,
          date: new Date()
        })
        this.$router.push('/images')
      },
      onDelete () {
        this.$store.dispatch('deleteImage', {
          id: this.item.id,
          imageUrl: this.item.imageUrl
        })
        this.$router.push('/images')
      }
    }
  }
</script>

<style>
</style>
