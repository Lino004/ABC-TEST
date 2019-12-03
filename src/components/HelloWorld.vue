<template>
  <v-container>
    <v-layout
      wrap
      justify-center
      v-if="show === -1"
    >
      <v-flex xs8>
        <v-layout pa-2 align-center justify-center column
          class="border">
          <v-flex>
            <p class="headline red--text font-weight-bold">Bienvenue !!!</p>
          </v-flex>
          <v-flex v-if="showText === 0" text-xs-center>
            <p class="body-2 pa-5">
              Expliquer à votre enfant qu’il devra lire des mots qui
              s’afficheront à l’écran le mieux possible et le plus
              rapidement possible.
            </p>
          </v-flex>
          <v-flex v-if="showText === 1" text-xs-center>
            <p class="body-2 pa-5">
              Préciser lui que certains mots sont “des mots inventé, qui
              n’existent pas et qui ne veulent rien dire” et qu’il faudra
              lire ce qui est écrit sans chercher à comprendre.
            </p>
          </v-flex>
          <v-flex v-if="showText === 2">
            <p class="body-2 pa-4">
              Si l’enfant lit bien le mot, cliquer sur <v-btn round small color="#2DC0EF" class="white--text">Correcte</v-btn> <br>
              S’il ne lit pas bien le mot, cliquer sur <v-btn round small color="#2DC0EF" class="white--text">Incorrecte</v-btn> <br>
              S’il ne lit n’arrive pas à lire pendant le chrono de 5secondes, le mot changera tout seul.
            </p>
          </v-flex>
          <v-flex>
            <v-layout justify-space-between row>
              <v-flex xs8>
                <p class="caption">
                  Ceci est un test de lecture extrait du test de dépistage
                  de la dyslexie (Odedys2) en licence CC.
                </p>
              </v-flex>
              <v-flex text-xs-right>
                <v-btn round small color="red" class="white--text" @click="nextText()">Suivant</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout
      text-xs-center
      wrap
      justify-center
      v-if="show === 0"
    >
      <v-flex xs8>
        <v-layout pa-5 align-end justify-center row
          class="border">
          <v-flex xs8>
            <v-layout
              class="border content elevation-5"
              align-center
              justify-center>
              <p class="display-3 font-weight-bold">{{mot}}</p>
            </v-layout>
          </v-flex>
          <v-flex xs4>
            <v-layout
              text-xs-center
              wrap
              column
              align-end>
              <v-btn round small color="#2DC0EF" class="white--text" @click="correcte()">Correcte</v-btn>
              <v-btn round small color="#2DC0EF" class="white--text" @click="incorrecte()">Incorrecte</v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs8 pa-5>
        <p class="display-1 font-weight-bold">{{seconde}}s</p>
      </v-flex>
    </v-layout>
    <v-layout
      text-xs-center
      wrap
      justify-center
      v-if="show === 1"
    >
      <v-flex xs8>
        <v-layout pa-5 align-center justify-center column
          class="border">
          <p class="display-1 font-weight-bold">Votre enfant est prêt ?</p>
          <v-btn round small color="#EE5858" class="white--text"
            @click="start(0, irreguliers, 'Irreguliers')">Demarrer</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout
      text-xs-center
      wrap
      justify-center
      v-if="show === 2"
    >
      <v-flex xs8>
        <v-layout pa-5 align-center justify-center column
          class="border">
          <p class="display-1 font-weight-bold">Etape 2</p>
          <v-btn round small color="#EE5858" class="white--text"
            @click="start(0, regulier, 'Reguliers')">Demarrer</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout
      text-xs-center
      wrap
      justify-center
      v-if="show === 3"
    >
      <v-flex xs8>
        <v-layout pa-5 align-center justify-center column
          class="border">
          <p class="display-1 font-weight-bold">Etape 3</p>
          <v-btn round small color="#EE5858" class="white--text"
            @click="start(0, nonMot, 'nonMot')">Demarrer</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout
      text-xs-center
      wrap
      justify-center
      v-if="show === 4"
    >
      <v-flex xs8>
        <v-layout v-if="result < 40" pa-5 align-center justify-center column
          class="border">
          <p class="headline font-weight-bold">Votre enfant a un pourcentage jugé à risque de la dyslexie</p>
          <p>
            Veuillez-cliquer ci-dessous pour en savoir plus
          </p>
          <v-btn round small color="red" class="white--text">
            <a
              class="white--text link"
              href="http://abc.futurix.tech/la-dyslexie/"
              target="__blank"
            >
              En savoir plus
            </a>
          </v-btn>
        </v-layout>
        <v-layout v-else pa-5 align-center justify-center column
          class="border">
          <p class="headline red--text font-weight-bold">Votre enfant n’est pas à risque</p>
          <v-btn round small color="red" class="white--text" @click="show = -1">Retourner à l'acceuil</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { db } from '@/firebase';

  export default {
    data: () => ({
      show: -1,
      showText: 0,
      seconde: 0,
      timer: null,
      irreguliers: [],
      regulier: [],
      nonMot: [],
      mot: '',
      nbMot: 0,
      getType: 'Irreguliers',
      result: 0,
    }),
    watch: {
      seconde(val) {
        if (val === 5) {
          this.restart(0);
        }
      },
    },
    methods: {
      nextText() {
        if (this.showText === 2) {
          this.show = 1;
          this.showText = -1;
        }
        this.showText += 1;
      },
      addS() {
        this.seconde += 1;
      },
      initTime() {
        this.timer = setInterval(this.addS, 1000);
      },
      stopTime() {
        clearInterval(this.timer);
      },
      start(index, data, type) {
        this.getType = type;
        this.setMot(data);
        this.show = index;
        this.initTime();
      },
      initMots() {
        db.ref('mots/').on('value', (snap) => {
          if (snap.val()) {
            const data = Object.values(snap.val());
            this.irreguliers = data.filter(el => el.type === 'Irreguliers' && el.niveau === 'Niveau1');
            this.regulier = data.filter(el => el.type === 'Reguliers' && el.niveau === 'Niveau1');
            this.nonMot = data.filter(el => el.type === 'Non-mot' && el.niveau === 'Niveau1');
          }
        });
      },
      setMot(data) {
        this.mot = data[this.nbMot].mot;
      },
      restart(score) {
        this.stopTime();
        this.seconde = 0;
        if (this.getType === 'Irreguliers') {
          this.irreguliers[this.nbMot].score = score;
          this.nbMot += 1;
          this.setMot(this.irreguliers);
          this.initTime();
          if (this.nbMot === 19) {
            this.irreguliers[19].score = score;
            this.show = 2;
            this.nbMot = 0;
            this.stopTime();
            this.seconde = 0;
          }
        }
        if (this.getType === 'Reguliers') {
          this.regulier[this.nbMot].score = score;
          this.nbMot += 1;
          this.setMot(this.regulier);
          this.initTime();
          if (this.nbMot === 19) {
            this.regulier[19].score = score;
            this.show = 3;
            this.nbMot = 0;
            this.stopTime();
            this.seconde = 0;
          }
        }
        if (this.getType === 'nonMot') {
          this.nonMot[this.nbMot].score = score;
          this.nbMot += 1;
          this.setMot(this.nonMot);
          this.initTime();
          if (this.nbMot === 19) {
            this.nonMot[19].score = score;
            this.calcul();
            this.show = 4;
            this.nbMot = 0;
            this.stopTime();
            this.seconde = 0;
          }
        }
      },
      calcul() {
        this.irreguliers.forEach( el => {
          this.result += el.score;
        });
        this.regulier.forEach( el => {
          this.result += el.score;
        });
        this.nonMot.forEach( el => {
          this.result += el.score;
        });

      },
      correcte() {
        this.restart(1);
      },
      incorrecte() {
        this.restart(0);
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

<style>
.border{
  border: solid 1px;
  border-radius: 5px;
}
.content{
  height: 250px;
}
.link{
  text-decoration-line: none;
}
</style>
