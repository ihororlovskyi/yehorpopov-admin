<template>
  <section>
    <v-container>
      <v-layout>
        <v-flex xs12 sm6 offset-sm3 lg4 offset-lg4>
          <app-alert v-if="error" @dismissed="onDismissed" :text="error.message"/>
          <form @submit.prevent="onSignin">
            <v-card >
              <v-card-title class="primary">
                <h1 class="white--text">{{ pageTitle }}</h1>
              </v-card-title>

              <v-card-text>
                <v-text-field
                  name="email"
                  label="Email"
                  id="email"
                  v-model="email"
                  type="email"
                  autocomplete="email"
                  required
                />
                <v-text-field
                  name="password"
                  label="Password"
                  id="password"
                  v-model="password"
                  type="password"
                  autocomplete="password"
                  required
                />
                <router-link to="/user/register">No account yet?</router-link>
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn
                  class="ml-0"
                  color="success"
                  large
                  :loading="loading"
                  :disabled="loading"
                  type="submit"
                >Sing In</v-btn>
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
        pageTitle: 'Login',
        email: '',
        password: ''
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      onSignin () {
        this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>

<style>
</style>
