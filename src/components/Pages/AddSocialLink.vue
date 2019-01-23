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
                      <v-text-field
                        name="link"
                        label="Link"
                        id="link"
                        v-model="link"
                        :prepend-icon="linkIcon"
                      />
                      <v-select
                        name="icon"
                        label="Icon"
                        id="icon"
                        :items="icons"
                        v-model="icon"
                        :prepend-icon="iconIcon"
                      />
                    </div>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-card>
                      <v-list two-line class="py-0">
                        <v-list-tile>
                          <v-list-tile-avatar>
                            <v-icon>{{ icon }}</v-icon>
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <v-list-tile-title>{{ title }}</v-list-tile-title>
                            <v-list-tile-sub-title>{{ link }}</v-list-tile-sub-title>
                          </v-list-tile-content>
                          <v-list-tile-action>
                            <v-layout row>
                              <v-tooltip
                                top
                                slot="activator"
                                color="primary"
                                open-delay="0"
                              >
                                <v-btn
                                  fab
                                  color="primary"
                                  slot="activator"
                                  small
                                  :href="link"
                                  target="_blank"
                                  class="mr-2"
                                >
                                  <v-icon>{{ iconIcon }}</v-icon>
                                </v-btn>
                                <span>Test Link</span>
                              </v-tooltip>
                            </v-layout>
                          </v-list-tile-action>
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
          title: 'Add Social Link',
          icon: 'mdi-plus'
        },
        titleIcon: 'mdi-format-title',
        linkIcon: 'mdi-link',
        iconIcon: 'mdi-hinduism',
        title: '',
        link: '',
        icon: '',
        icons: [
          'mdi-facebook',
          'mdi-instagram',
          'mdi-telegram'
        ]
      }
    },
    computed: {
      formIsValid () {
        return this.title !== '' && this.link !== ''
      }
    },
    methods: {
      onCancel () {
        this.$router.push('/social')
      },
      onPublish () {
        if (!this.formIsValid) {
          return
        }
        const itemData = {
          title: this.title,
          link: this.link,
          icon: this.icon,
          date: new Date()
        }
        this.$store.dispatch('createSocialLink', itemData)
        this.$router.push('/social')
      }
    }
  }
</script>

<style>
</style>
