<template>
  <v-app>
    <v-container>
      <v-text-field
            v-model="search"
            label="Pesquisar"
            placeholder="Pesquisar"
            solo
          ></v-text-field>
        <v-container>
          <v-row>
            <v-col class="text-center" cols="3" v-for="pokemon in filtrar_pokemons" :key="pokemon.name">
              <v-card @click="mostrar_dialog = !mostrar_dialog">
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
    </v-container>
    <v-dialog
      v-model="mostrar_dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Privacy Policy
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>
        <v-container>

        </v-container>
      </v-card>
    </v-dialog>
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
      mostrar_dialog: false,
      selecionar_pokemon: null,
    };
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
  },
},
};
</script>

<style>
#app {
  background: linear-gradient(to bottom, #6ab7f5, #fff)
    no-repeat center center fixed !important;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover !important;
  background-position: center;
  min-height: 100vh;
};
</style>
