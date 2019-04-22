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
                        гугл <a href="https://docs.google.com/spreadsheets/d/1ppfxeSO4XCZMDZ6y0kk1-ZCaqyITUJCtgShj17I9isE/edit" target="_blank">табличка</a>
                      </li>
                      <li>
                        сервис <a href="https://sheetdb.io/usage" target="_blank">sheetdb</a>
                      </li>
                    </ul>
                  </p>
                  <p>
                    <table v-if="users" style="width:100%">
                      <caption style="text-align:left">Users</caption>
                      <tr style="text-align:left">
                        <th>id</th>
                        <th>phone</th>
                        <th>email</th>
                        <th>date</th>
                        <th>url</th>
                        <th>comment</th>
                      </tr>
                      <tr v-for="i in users.values">
                        <td>{{ i[0] }}</td>
                        <td>{{ i[1] }}</td>
                        <td>{{ i[2] }}</td>
                        <td>{{ i[3] }}</td>
                        <td>{{ i[4] }}</td>
                        <td>{{ i[5] }}</td>
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
        email: '',
        date: '',
        url: '',
        comment: ''
      }
    },
    mounted () {
      axios.get('https://sheets.googleapis.com/v4/spreadsheets/1ppfxeSO4XCZMDZ6y0kk1-ZCaqyITUJCtgShj17I9isE/values/A2:F100?key=AIzaSyBe9QRJoT1Cm90GZDf4HRNNfz0pvSRscoE')
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
