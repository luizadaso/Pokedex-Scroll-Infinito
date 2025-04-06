<template>
  <v-app>
    <v-container>
      <v-text-field
            v-model="search"
            label="Pesquisar"
            placeholder="Pesquisar"
            solo
          ></v-text-field>
      <v-card>
        <v-container>
          <v-row>
            <v-col class="text-center" cols="3" v-for="pokemon in filtrar_pokemons" :key="pokemon.name">
              <v-card>
                <v-container>
                  <img 
                  :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${get_id(pokemon)}.png`"
                  :alt="pokemon.name" 
                  width="55%">
                  <h2 class="text-center">{{get_name(pokemon)}}</h2>
                  <p class="text-center">ID: 
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
      search: "",
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
    },

    get_name(pokemon){
      return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    },
  },

  computed: {
    filtrar_pokemons() {
      return this.pokemons.filter((item) => {
        const id = this.get_id(item);
        return item.name.toLowerCase().includes(this.search.toLowerCase()) || id.toString() === this.search;
      });
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
