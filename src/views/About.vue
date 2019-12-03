<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap>

      <v-flex xs12>
        <v-layout row wrap>

          <v-flex xs12 sm6 md3 pa-2>
            <v-select
              v-model="niveau"
              :items="['Niveau1', 'Niveau2']"
              label="Outline style"
              outline
            ></v-select>
          </v-flex>

          <v-flex xs12 sm6 md3 pa-2>
            <v-select
              v-model="type"
              :items="['Reguliers', 'Irreguliers', 'Non-mot']"
              label="Outline style"
              outline
            ></v-select>
          </v-flex>

          <v-flex xs12 sm6 md3 pa-2>
            <v-text-field
              v-model="mot"
              label="Mot"
              outline
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm6 md3 pa-3>
            <v-btn @click="add()" color="info">Ajouter</v-btn>
          </v-flex>

        </v-layout>
      </v-flex>

      <v-flex xs12>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Recherche"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="data"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td>{{ props.item.niveau }}</td>
            <td class="text-xs-center">{{ props.item.type }}</td>
            <td class="text-xs-center">{{ props.item.mot }}</td>
          </template>
        </v-data-table>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import { db } from '@/firebase';

  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Niveau', align: 'center', value: 'niveau'},
          { text: 'Type', align: 'center', value: 'type' },
          { text: 'Mot (g)', align: 'center', value: 'mot' },
        ],
        data: [],
        niveau: '',
        type: '',
        mot: '',
      }
    },
    methods: {
      add() {
        if (this.niveau && this.type && this.mot) {
          const idMot = db.ref().child(`mots/`).push().key;
          db.ref(`mots/${idMot}`).set({
            niveau: this.niveau,
            type: this.type,
            mot: this.mot,
            id: idMot,
            score: null,
          })
        }
      },
      initMots() {
        db.ref('mots/').on('value', (snap) => {
          if (snap.val()) {
            this.data = Object.values(snap.val());
          }
        });
      },
    },
    mounted () {
      this.initMots();
    },
    destroyed () {
      db.ref('mots/').off();
    }
  }
</script>
