<template>
  <v-app>
    <v-container>
      <v-card>
        <v-container>
          <v-row>
            <v-col class="text-center" cols="3" v-for="pokemon in pokemons.slice(0,10)" :key="pokemon.name">
              <v-card>
                <v-container>
                  <img 
                  :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${get_id(pokemon)}.png`"
                  :alt="pokemon.name" 
                  width="80%">
                  <h2 class="text-center">{{pokemon.name}}</h2>
                  <p class="text-left">ID: 
                    {{get_id(pokemon)}}</p>
                  <p></p>
              
                </v-container>
              </v-card>
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
  },

  methods: {
    get_id(pokemon){
    return Number(pokemon.url.split("/")[6])
    }
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
