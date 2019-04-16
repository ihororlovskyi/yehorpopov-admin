<template>
  <section>
    <v-container>
      <v-layout>
        <v-flex xs12>
          <v-card>
            <page-title :icon="page.icon" :title="page.title"/>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs12 v-if="userIsAdmin">
                  <p>You are an admin. You can edit content :)</p>
                  <!-- <a v-if="userIsAdmin" href="https://app.netlify.com/start/deploy?repository=https://github.com/ihororlovskyi/yehorpopov-nuxt">
                    <img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify">
                  </a> -->
                  <p>
                    <ul>
                      <li>
                        гугл <a htef="https://docs.google.com/spreadsheets/d/1ppfxeSO4XCZMDZ6y0kk1-ZCaqyITUJCtgShj17I9isE/edit" target="_blank">табличка</a>
                      </li>
                      <li>
                        сервис <a htef="https://sheetdb.io" target="_blank">sheetdb</a>
                      </li>
                    </ul>
                  </p>
                  <p>
                    <table v-if="users">
                      <caption>Users</caption>
                      <tr>
                        <th>id</th>
                        <th>phone</th>
                        <th>email</th>
                      </tr>
                      <tr v-for="i in users.values">
                        <td>{{ i[0] }}</td>
                        <td>{{ i[1] }}</td>
                        <td>{{ i[2] }}</td>
                      </tr>
                    </table>
                  </p>
                </v-flex>
                <v-flex xs12 v-else>
                  <p>You are not an admin. You cant edit content :(</p>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        page: {
          title: 'Admin',
          icon: 'mdi-security'
        },
        users: {},
        id: '',
        phone: '',
        email: ''
      }
    },
    mounted () {
      axios.get('https://sheets.googleapis.com/v4/spreadsheets/1ppfxeSO4XCZMDZ6y0kk1-ZCaqyITUJCtgShj17I9isE/values/A2:C100?key=AIzaSyBe9QRJoT1Cm90GZDf4HRNNfz0pvSRscoE')
        .then((response) => {
          this.users = response.data
          this.id = response.data.values.length
        })
    },
    computed: {
      userIsAdmin () {
        return this.$store.getters.userIsAdmin
      }
    }
  }
</script>

<style>
</style>
