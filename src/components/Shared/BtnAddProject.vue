<template>
  <v-btn large color="success" class="mx-0" :to="addProjectBtn.url">
    <v-icon left>{{ addProjectBtn.icon }}</v-icon>
    {{ addProjectBtn.title }}
  </v-btn>
</template>

<script>
  export default {
    data () {
      return {
        addProjectBtn: {
          title: 'Add Project',
          icon: 'mdi-plus-box',
          url: '/admin/add-project'
        }
      }
    }
  }
</script>

<style>
</style>
