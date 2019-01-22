<template>
  <v-dialog
    v-model="editProjectImgCoverDialog"
    max-width="666"
    @keydown.enter="onSaveChanges"
    @keydown.esc="editProjectImgCoverDialog=false"
  >

    <v-tooltip top slot="activator" color="error" open-delay="0">
      <v-btn
        fab
        small
        color="error"
        slot="activator"
      >
        <v-icon>mdi-image</v-icon>
      </v-btn>
      <span>Update imgCover</span>
    </v-tooltip>

    <v-card>
      <!-- <v-container> -->
        <v-card-title class="headline">Update imgCover</v-card-title>
        <v-card-text>
          <div>imgCover</div>
          <div class="edit-lottery-dialog__image-url-container">
            <div v-if="imageUrlIsVisible">
              <img :src="editedImgCover">
              <v-btn
                small
                fab
                class="error btn--remoove-image-url"
                @click="onRemoveImageUrl"
              >
                <v-icon large>mdi-close</v-icon>
              </v-btn>
            </div>
            <div>
              <!-- <img
                src="/static/img/logos/veglas-watermark-1300x420.png"
                class="addon"
                style="display: none;"
              > -->
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
                :prevent-white-space="true"
                :remove-button-size="40"
                @file-type-mismatch="onFileTypeMismatch"
              />
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.stop="editProjectImgCoverDialog=false">Cancel</v-btn>
          <v-btn color="warning" @click="onSaveChanges">Save</v-btn>
        </v-card-actions>
      <!-- </v-container> -->
    </v-card>

  </v-dialog>
</template>

<script>
  export default {
    props: ['item'],
    data () {
      return {
        imageUrlIsVisible: true,
        editProjectImgCoverDialog: false,
        image: null,
        croppa: {},
        editedImgCover: this.item.imgCover
      }
    },
    methods: {
      onRemoveImageUrl () {
        this.imageUrlIsVisible = false
      },
      onFileTypeMismatch (file) {
        alert('This file is not valid. Please upload a valid file jpg/jpeg/png.')
      },
      // onDraw: function (ctx) {
      //   ctx.save()
      //   ctx.globalAlpha = 0.7
      //   ctx.drawImage(document.querySelector('.addon'), 750, 556, 310, 100)
      //   ctx.restore()
      // },
      onSaveChanges () {
        if (!this.croppa.hasImage()) {
          alert('No image.')
          this.imageUrlIsVisible = true
          return
        } else {
          this.croppa.generateBlob((blob) => {
            var file = new File([blob], 'name.jpeg', {
              lastModifiedDate: new Date(),
              type: 'image/jpeg'
            })
            const itemData = {
              id: this.item.id,
              imageUrl: this.editedImgCover,
              image: file,
              date: new Date()
            }
            this.$store.dispatch('updateProjectImgCover', itemData)
          }, 'image/jpeg', 0.8)
        }
        this.editProjectImgCoverDialog = false
        this.$router.push('/project/' + this.item.id)
      }
    }
  }
</script>

<style>
  .edit-lottery-dialog__image-url-container {
    width: 100%;
    max-width: 480px;
    position: relative;
  }
  .edit-lottery-dialog__image-url-container img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: auto;
  }
  .btn--remoove-image-url {
    position: absolute !important;
    top: 0;
    right: 0;
    z-index: 20;
  }
  .croppa-container canvas {
    max-width: 100% !important;
    height: auto !important;
  }
</style>
