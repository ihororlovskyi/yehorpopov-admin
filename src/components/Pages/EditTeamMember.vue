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
                    <v-text-field
                      name="name"
                      label="Name"
                      id="name"
                      v-model="item.name"
                      :prepend-icon="nameIcon"
                    />
                    <v-text-field
                      name="position"
                      label="Position"
                      id="position"
                      v-model="item.position"
                      :prepend-icon="positionIcon"
                    />
                    <v-text-field
                      name="photo"
                      label="Photo"
                      id="photo"
                      v-model="item.photo"
                      :prepend-icon="photoIcon"
                    />
                    <v-textarea
                      name="quote"
                      label="Quote (HTML)"
                      id="quote"
                      v-model="item.quote"
                      :prepend-icon="quoteIcon"
                    />
                  </div>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-card>
                    <v-card-title class="light-blue lighten-1">
                      <h1 class="white--text">
                        <v-icon class="white--text">{{ nameIcon }}</v-icon>
                        {{ item.name }}
                      </h1>
                      <v-spacer/>
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
                    </v-card-title>
                    <v-card-text>
                      <p>
                        <v-icon>{{ positionIcon }}</v-icon>
                        {{ item.position }}
                      </p>
                      <p>
                        <div class="ImageContainer">
                          <div v-if="photoIsVisible">
                            <v-img :src="item.photo"/>
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
                            />
                          </div>
                        </div>
                      </p>
                      <p>
                        <v-icon>{{ quoteIcon }}</v-icon>
                        <span v-html="item.quote"/>
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
          title: 'Edit Team Member',
          icon: 'mdi-clipboard-account'
        },
        deleteText: 'This Team Member will be deleted permanently.<br>Are you sure you want to delete this Team Member?',
        deleteTicketDialog: false,
        nameIcon: 'mdi-account-card-details',
        positionIcon: 'mdi-android-studio',
        photoIcon: 'mdi-image',
        quoteIcon: 'mdi-format-quote-close',
        photoIsVisible: true,
        image: null,
        croppa: {}
      }
    },
    computed: {
      item () {
        return this.$store.getters.loadedTeamMember(this.id)
      },
      userIsAdmin () {
        return this.$store.getters.userIsAdmin
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
        this.$router.push('/team')
      },
      onSave () {
        if (this.photoIsVisible) {
          this.$store.dispatch('updateTeamMember', {
            id: this.item.id,
            name: this.item.name,
            position: this.item.position,
            photo: this.item.photo,
            quote: this.item.quote
          })
          this.$router.push('/team')
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
                name: this.item.name,
                position: this.item.position,
                photo: this.item.photo,
                quote: this.item.quote,
                image: file,
                date: new Date()
              }
              this.$store.dispatch('updateTeamMember', itemData)
            }, 'image/jpeg', 0.8)
          }
          this.$router.push('/team')
        }
      },
      onDelete () {
        this.$store.dispatch('deleteTeamMember', {
          id: this.item.id,
          photo: this.item.photo
        })
        this.$router.push('/team')
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
