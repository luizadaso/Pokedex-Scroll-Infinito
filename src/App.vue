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
              <v-card @click="mostrar_pokemon(get_id(pokemon))">
                <v-container>
                  <img 
                  :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${get_id(pokemon)}.png`"
                  :alt="pokemon.name" 
                  width="55%"
                  />
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
      width="50%"
    >
    <v-card v-if="selecionar_pokemon" class="px-2">
      <v-row>
            <v-col class="d-flex justify-end">
              <v-btn icon @click="fechar_dialog" class="close-btn">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        <v-container>
          <v-row class="d-flex align-center">
            <v-col cols="8">
            </v-col>
            <v-col cols="8" class="text-center"> 
              <h1>{{get_name(selecionar_pokemon)}}</h1>
              <v-chip>Tipo:</v-chip>
              <v-chip class="ml-2" v-for="type in selecionar_pokemon.types" :key="type.slot">
                {{type.type.name}}
              </v-chip>
              <v-divider class="my-4">
            </v-divider>
              <v-chip>Altura: {{selecionar_pokemon.height * 2.54}} cm</v-chip>
              <v-chip class="ml-2">Peso: {{(selecionar_pokemon.weight * 0.453592).toFixed(0)}} kg</v-chip>
            </v-col>
            <v-col cols="4">
              <img 
                :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selecionar_pokemon.id}.png`"
                :alt="selecionar_pokemon.name" 
                width="80%"
              />
            </v-col>
          </v-row>
          <h2>Movimentos</h2>
          <v-simple-table
    fixed-header
    height="100%"
  >
    <template>
      <thead>
        <tr>
          <th class="text-left">
            Level
          </th>
          <th class="text-left">
            Nome
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in filter_moves(selecionar_pokemon)" 
          :key="item.move.name"
        >
          <td>0</td>
          <td>{{ item.move.name }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
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

    mostrar_pokemon(id){
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) => {
        this.selecionar_pokemon = response.data;
        this.mostrar_dialog = !this.mostrar_dialog;
      });
    },

    fechar_dialog() {
      this.selecionar_pokemon = null;
      this.mostrar_dialog = false;
    },

    filter_moves(){}
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
