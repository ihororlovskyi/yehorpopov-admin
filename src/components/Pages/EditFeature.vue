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
                      name="title"
                      label="Title"
                      id="title"
                      v-model="item.title"
                      :prepend-icon="titleIcon"
                    />
                    <v-checkbox
                      v-model="item.isPublished"
                      :label="`Is Published?: ${item.isPublished.toString()}`"
                      :prepend-icon="isPublishedIcon"
                    />
                    <v-textarea
                      name="description"
                      label="Description"
                      id="description"
                      v-model="item.description"
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
                            <v-icon v-if="item.isPublished" small color="green darken-3">mdi-eye</v-icon>
                            <v-icon v-else small color="yellow darken-3">mdi-eye-off</v-icon>
                            {{ item.title }}
                          </v-list-tile-title>
                          <v-list-tile-sub-title>{{ item.description }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-layout row>
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
          title: 'Edit Feature',
          icon: 'mdi-pencil'
        },
        deleteText: 'This Feature will be deleted permanently.<br>Are you sure you want to delete this Feature?',
        deleteTicketDialog: false,
        titleIcon: 'mdi-format-title',
        isPublishedIcon: 'mdi-eye-check-outline',
        descriptionIcon: 'mdi-text-subject'
      }
    },
    computed: {
      item () {
        return this.$store.getters.loadedFeature(this.id)
      }
    },
    methods: {
      onCancel () {
        this.$router.push('/features')
      },
      onSave () {
        this.$store.dispatch('updateFeature', {
          id: this.item.id,
          title: this.item.title,
          isPublished: this.item.isPublished,
          description: this.item.description
        })
        this.$router.push('/features')
      },
      onDelete () {
        this.$store.dispatch('deleteFeature', {
          id: this.item.id
        })
        this.$router.push('/features')
      }
    }
  }
</script>

<style>
</style>
