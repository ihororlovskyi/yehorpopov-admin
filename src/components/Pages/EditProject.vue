<template>
  <section>
    <v-container>
      <v-layout>
        <v-flex xs12>

          <v-card>
            <v-card-title class="primary">
              <h1 class="white--text">{{ pageTitle }}</h1>
            </v-card-title>

            <!-- <v-card-title>

            </v-card-title> -->

            <!-- <v-card-media
              height="500"
              :src="item.imageUrl"
            /> -->


            <v-card-text>
              <v-layout row wrap>
                <v-flex xs4>
                  <v-text-field
                    name="title"
                    label="Title"
                    id="title"
                    v-model="item.title"
                    prepend-icon="mdi-format-title"
                  />
                  <v-text-field
                    name="shorttitle"
                    label="Short Title"
                    id="shorttitle"
                    v-model="item.shorttitle"
                    prepend-icon="mdi-alpha-t"
                  />
                  <v-text-field
                    name="slug"
                    label="Slug"
                    id="slug"
                    v-model="item.slug"
                    prepend-icon="mdi-link"
                  />
                  <v-text-field
                    name="price"
                    label="Price"
                    id="price"
                    v-model="item.price"
                    prepend-icon="mdi-currency-usd"
                  />
                  <v-checkbox
                    v-model="item.atHero"
                    :label="`Show at hero?: ${item.atHero.toString()}`"
                  />
                  <v-textarea
                    name="description"
                    label="Description"
                    id="description"
                    v-model="item.description"
                  />
                  <v-text-field
                    name="imgCover"
                    label="imgCover"
                    id="imgCover"
                    v-model="item.imgCover"
                    prepend-icon="mdi-image"
                  />
                  <v-text-field
                    name="imgSlider"
                    label="imgSlider"
                    id="imgSlider"
                    v-model="item.imgSlider"
                    prepend-icon="mdi-image"
                  />
                  <v-text-field
                    name="imgSlim"
                    label="imgSlim"
                    id="imgSlim"
                    v-model="item.imgSlim"
                    prepend-icon="mdi-image"
                  />
                </v-flex>
                <v-flex xs8>

                <h1 class="mb-2">{{ item.title }}</h1>

                <!-- <v-spacer/>

                <edit-project-dialog
                  v-if="userIsAdmin"
                  :item="item"
                />

                <delete-project-dialog
                  v-if="userIsAdmin"
                  :item="item"
                /> -->

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

                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                class="mx-0"
                color="warning"
                large
                @click="onSaveChanges"
              >
                <v-icon left>mdi-pen</v-icon>
                <span>Edit Project</span>
              </v-btn>
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
        pageTitle: 'Edit Project'
      }
    },
    computed: {
      // loading () {
      //   return this.$store.getters.loading
      // },
      item () {
        return this.$store.getters.loadedProject(this.id)
      },
      userIsAdmin () {
        return this.$store.getters.userIsAdmin
      }
    },
    methods: {
      onSaveChanges () {
        this.$store.dispatch('updateProjectData', {
          id: this.item.id,
          title: this.item.title,
          slug: this.item.slug,
          shorttitle: this.item.shorttitle,
          description: this.item.description,
          price: this.item.price,
          atHero: this.item.atHero,
          imgCover: this.item.imgCover,
          imgSlider: this.item.imgSlider,
          imgSlim: this.item.imgSlim
        })
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
