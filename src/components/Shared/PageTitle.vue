<template>
  <v-card-title class="primary">
    <h1 class="white--text">
      <v-icon class="white--text">{{ icon }}</v-icon>
      {{ title }}
    </h1>
  </v-card-title>
</template>

<script>
  export default {
    props: [
      'icon',
      'title'
    ]
  }
</script>

<style>
</style>
