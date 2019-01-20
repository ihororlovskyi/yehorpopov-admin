<template>
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

        <v-card-text pa-1 v-html="text"/>

        <v-card-actions>
          <v-spacer/>
          <v-btn @click.stop="deleteTicketDialog=false">Cancel</v-btn>
          <v-btn color="error" @click="onRemove">Delete</v-btn>
        </v-card-actions>

      </v-container>
    </v-card>

  </v-dialog>
</template>

<script>
  export default {
    props: ['item'],
    data () {
      return {
        text: 'The project will be deleted permanently.<br>Are you sure you want to delete this project?',
        deleteTicketDialog: false
      }
    },
    methods: {
      onSaveChanges () {
        this.deleteTicketDialog = false
      },
      onRemove () {
        this.$store.dispatch('removeProject', {
          id: this.item.id,
          imgCover: this.item.imgCover
        })
        this.$router.push('/projects')
      }
    }
  }
</script>

<style>
</style>
