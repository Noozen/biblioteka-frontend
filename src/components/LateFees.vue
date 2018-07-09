<template>
  <div class="LateFees">
    <h2>Informacje na temat spóznionych zwrotów</h2>
    <br>
    <br>
    <b-table :items="items" :fields="masterFields">
      <template slot="detale" slot-scope="row">
        <b-button size="sm" @click.stop="detailView = row.item" class="mr-2">
          WYBIERZ
        </b-button>
      </template>
    </b-table>
    <br>
    <div v-show="this.detailView.przetrzymanePrzedmioty.length > 0">
      <h2>Informacje na temat opóznień użytkownika {{detailView.imie}} {{detailView.nazwisko}}</h2>
      <br><br>
      <b-table :items="detailView.przetrzymanePrzedmioty" :fields="detailFields"></b-table>
      <br><br>
      <b-row>
        <b-col>
          <h3>SALDO: <b>{{detailView.saldo}}</b></h3>
        </b-col>
        <b-col>
          <b-button v-b-modal.myModal variant="danger" size="xl" @click.stop="" class="mr-2">
            WYSLIJ PONAGLENIE
          </b-button>
        </b-col>
      </b-row>

    </div>

    <b-modal id="myModal" @ok="sendLateFeesEmail()">
      Czy na pewno wysłać ponaglenie użytkownikowi?
    </b-modal>
  </div>
</template>

<script>
  // import axios from 'axios'
  import {AXIOS} from './http-common'

  export default {
    name: 'LateFees',

    data() {
      return {
        detailView: {
          firstName: "",
          lastName: "",
          przetrzymanePrzedmioty: [],
          saldo: "",
          id: ""
        },
        masterFields: [
          {key: 'imie', sortable: true},
          {key: 'nazwisko', sortable: true},
          {key: 'saldo', sortable: true},
          {key: 'detale', sortable: false}],
        detailFields: [
          {key: 'autor', sortable: true},
          {key: 'nazwa', sortable: true},
          {key: 'dataTeoretycznegoOddania', sortable: true}],
        items: []
      }
    },
    mounted: function () {
      this.getLateFees();
    },
    methods: {
      // Fetches posts when the component is created.
      getLateFees() {
        AXIOS.get(`/lateFees`)
          .then(response => {
            console.log(response);
            this.items = response.data;
          })
      },
      sendLateFeesEmail() {
        AXIOS.post(`/sendLateFeesEmail`, {id: this.detailView.id})
          .then(response => {
            console.log(response);
          })
      }
    }
  }

</script>
