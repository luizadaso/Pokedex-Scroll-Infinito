<template>
  <v-app>
    <v-container>
      <v-card>
        <v-container>
          {{pokemons}}
          <v-row>
            <v-col cols="2" v-for="pokemon in pokemons" :key="pokemon.name">
              <h2>{{pokemon.name}}</h2>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>

import axios from 'axios';

export default {
  name: 'App',

  components: {
  },

  data (){
    return {
      pokemons: [],
    }
  },

  mounted () {
    console.log("Aplicação executada.");
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=151").then((response) => {
      this.pokemons = response.data.results;
    });
  }
};
</script>

<style>
#app {
  background: linear-gradient(
      to bottom right,
      rgba(10, 10, 10, 1),
      rgba(12, 39, 63, 1)
    )
    no-repeat center center fixed !important;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover !important;
  background-position: center;
  min-height: 100vh;
}
</style>
