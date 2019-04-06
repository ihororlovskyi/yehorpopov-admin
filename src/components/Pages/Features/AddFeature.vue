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
                  <v-flex xs12 sm6>
                    <div class="pr-4">

                      <v-text-field
                        name="title"
                        label="Title"
                        id="title"
                        v-model="title"
                        :prepend-icon="titleIcon"
                      />
                      <v-checkbox
                        v-model="isPublished"
                        :label="`Is Published?: ${isPublished.toString()}`"
                        :prepend-icon="isPublishedIcon"
                      />
                      <v-textarea
                        name="description"
                        label="Description (HTML)"
                        id="description"
                        v-model="description"
                        :prepend-icon="descriptionIcon"
                      />

                    </div>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-card>
                      <v-list two-line class="py-0">
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-title>
                              <v-icon v-if="isPublished" small color="green darken-3">mdi-eye</v-icon>
                              <v-icon v-else small color="yellow darken-3">mdi-eye-off</v-icon>
                              {{ title }}
                            </v-list-tile-title>
                            <v-list-tile-sub-title>{{ description }}</v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-list>
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
          title: 'Add Feature',
          icon: 'mdi-plus'
        },
        title: '',
        titleIcon: 'mdi-format-title',
        isPublished: false,
        isPublishedIcon: 'mdi-eye-check',
        description: '',
        descriptionIcon: 'mdi-text-subject'
      }
    },
    computed: {
      formIsValid () {
        return this.title !== ''
      }
    },
    methods: {
      onCancel () {
        this.$router.push('/features')
      },
      onPublish () {
        if (!this.formIsValid) {
          return
        }
        const itemData = {
          title: this.title,
          isPublished: this.isPublished,
          description: this.description,
          date: new Date()
        }
        this.$store.dispatch('createFeature', itemData)
        this.$router.push('/features')
      }
    }
  }
</script>

<style>
</style>
