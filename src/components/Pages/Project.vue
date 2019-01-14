<template>
  <v-flex xs12 sm8 offset-sm2>

    <v-progress-circular
      v-if="loading"
      indeterminate
      :size="150"
      color="amber"
    />

    <v-card v-else>

      <v-card-title>

        <h1>{{ item.title }}</h1>

        <v-spacer/>

        <edit-project-dialog
          v-if="userIsAdmin"
          :item="item"
        />

        <delete-project-dialog
          v-if="userIsAdmin"
          :item="item"
        />
      </v-card-title>

      <!-- <v-card-media
        height="500"
        :src="item.imageUrl"
      /> -->

      <v-card-text>

        <p><b>shorttitle:</b> {{ item.shorttitle }}</p>
        <p><b>slug:</b> {{ item.slug }}</p>
        <p><b>description:</b> <span v-html="item.description"/></p>
        <p><b>price:</b> {{ item.price }}</p>
        <p><b>Show at hero?:</b> {{ `${item.atHero.toString()}` }}</p>

        <v-layout row wrap>
          <v-flex xs4>
            <div>imgCover:</div>
            <img
              v-if="item.imgCover"
              :src="item.imgCover"
              width="150"
              class="d-block"
            />
          </v-flex>

          <v-flex xs4>
            <div>imgSlider:</div>
            <img
              v-if="item.imgSlider"
              :src="item.imgSlider"
              width="150"
              class="d-block"
            />
          </v-flex>

          <v-flex xs4>
            <div>imgSlim:</div>
            <img
              v-if="item.imgSlim"
              :src="item.imgSlim"
              width="150"
              class="d-block"
            />
          </v-flex>
        </v-layout>

        <p><b>date:</b> {{ item.date | date }}</p>

      </v-card-text>
    </v-card>

  </v-flex>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      item () {
        return this.$store.getters.loadedProject(this.id)
      },
      userIsAdmin () {
        return this.$store.getters.userIsAdmin
      }
    }
  }
</script>

<style>
  /*.ticket__winners {*/
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 0;*/
  /*}*/
  .ticket__edit {
    position: absolute;
    top: 0;
    right: 0;
  }
  .ticket__thumd {
    background-color: gainsboro;
  }
  .ticket__img-yes {
    max-width: 100%;
    margin: 0 auto 8px;
    display: block;
  }
  .ticket__img-no {
    width: 100%;
    height: 400px;
    margin: 0 auto 8px;
    padding: 16px;
  }
</style>
