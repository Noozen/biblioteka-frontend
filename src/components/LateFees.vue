<template>
  <div class="LateFees">
    <h1>Informacje na temat spoznionych zwrotow</h1>
    <br>
    <br>
    <b-table :items="items" :fields="fields">
      <template slot="show_details" slot-scope="row">
        <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
        <b-button size="sm" @click.stop="detailView = row.item" class="mr-2">
          Details
        </b-button>
      </template>
    </b-table>

    <div v-show="this.detailView.przetrzymanePrzedmioty.length > 0">
      <h2>Informacje na temat opoznien uzytkownika {{detailView.imie}} {{detailView.nazwisko}}</h2>
      <br><br>
      <b-table :items="detailView.przetrzymanePrzedmioty" :fields="fields2" ></b-table>
      <br><br>
      <b-row>
        <b-col>
          <h3>SALDO: {{detailView.saldo}}</h3>
        </b-col>
        <b-col>
          <b-button variant="danger" size="xl" @click.stop="" class="mr-2">
            WYSLIJ PONAGLENIE
          </b-button>
        </b-col>
      </b-row>

    </div>


      </div>
</template>

<script>
  // import axios from 'axios'
  import {AXIOS} from './http-common'

  export default {
    name: 'LateFees',

    data () {
      return {
        response: [],
        detailView: {
          firstName: "",
          lastName: "",
          przetrzymanePrzedmioty: [],
          saldo: ""
        },
        errors: [],
        user: {
          lastName: '',
          firstName: '',
          id: 0
        },
        showResponse: false,
        retrievedUser: {},
        showRetrievedUser: false,
        fields: [ 'imie', 'nazwisko', 'saldo', 'show_details' ],
        fields2: [ 'autor', 'nazwa', 'dataTeoretycznegoOddania'],
        items: []
      }
    },
    mounted: function() {
      this.getLateFees();
    },
    methods: {
      // Fetches posts when the component is created.
      getLateFees () {
        AXIOS.get(`/lateFees`)
          .then(response => {
            console.log(response);
            this.items = response.data;
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
    }
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
