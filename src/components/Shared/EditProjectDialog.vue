<template>
  <v-dialog v-model="editTicketDialog" max-width="660" @keydown.enter="onSaveChanges">

    <v-tooltip top slot="activator" color="warning" open-delay="0">
      <v-btn
        fab
        color="warning"
        slot="activator"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <span>Редактировать</span>
    </v-tooltip>

    <v-card>
      <!-- <v-container pa-1> -->
      <v-card-text pa-1>
        <v-text-field
          name="title"
          id="title"
          label="Title"
          v-model="editedTitle"
        />
        <v-text-field
          name="slug"
          id="slug"
          label="Slug"
          v-model="editedSlug"
        />
        <v-text-field
          name="shorttitle"
          id="shorttitle"
          label="Short Title"
          v-model="editedShorttitle"
        />
        <v-text-field
          name="description"
          id="description"
          label="Description"
          v-model="editedDescription"
          multi-line
        />
        <v-text-field
          name="price"
          id="price"
          label="Price"
          v-model="editedPrice"
        />
        <v-checkbox
          v-model="editedAtHero"
          :label="`Show at hero?: ${editedAtHero.toString()}`"
        />
        <v-text-field
          name="imgCover"
          id="imgCover"
          label="imgCover"
          v-model="editedImgCover"
        />
        <img
          v-if="editedImgCover"
          :src="editedImgCover"
          class="d-block"
          width="150"
        />
        <v-text-field
          name="imgSlider"
          id="imgSlider"
          label="imgSlider"
          v-model="editedImgSlider"
        />
        <img
          v-if="editedImgSlider"
          :src="editedImgSlider"
          class="d-block"
          width="150"
        />
        <v-text-field
          name="imgSlim"
          id="imgSlim"
          label="imgSlim"
          v-model="editedImgSlim"
        />
        <img
          v-if="editedImgSlim"
          :src="editedImgSlim"
          class="d-block"
          width="150"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn @click.stop="editTicketDialog=false">Отмена</v-btn>
        <v-btn color="warning" @click="onSaveChanges">Сохранить</v-btn>
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
        editTicketDialog: false,
        editedTitle: this.item.title,
        editedSlug: this.item.slug,
        editedShorttitle: this.item.shorttitle,
        editedDescription: this.item.description,
        editedPrice: this.item.price,
        editedAtHero: this.item.atHero,
        editedImgCover: this.item.imgCover,
        editedImgSlider: this.item.imgSlider,
        editedImgSlim: this.item.imgSlim
      }
    },
    methods: {
      onSaveChanges () {
        this.editTicketDialog = false
        this.$store.dispatch('updateProjectData', {
          id: this.item.id,
          title: this.editedTitle,
          slug: this.editedSlug,
          shorttitle: this.editedShorttitle,
          description: this.editedDescription,
          price: this.editedPrice,
          atHero: this.editedAtHero,
          imgCover: this.editedImgCover,
          imgSlider: this.editedImgSlider,
          imgSlim: this.editedImgSlim
        })
      }
    }
  }
</script>

<style>
</style>
