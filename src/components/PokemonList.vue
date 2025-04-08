<template>
    <v-container class="content-container">
      <v-row>
        <v-col class="text-center" cols="3" v-for="pokemon in filteredPokemons" :key="pokemon.name">
          <v-card class="pokemon-card" elevation="8" @click="showPokemon(getId(pokemon))">
            <v-container>
              <img 
                :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getId(pokemon)}.png`"
                :alt="pokemon.name" 
                width="55%"
              />
              <h2 class="text-center">{{ getName(pokemon) }}</h2>
              <p class="text-center">ID: {{ getId(pokemon) }}</p>
              <p></p>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'PokemonList',
    props: ['pokemons', 'search'],
    methods: {
      getId(pokemon) {
        return Number(pokemon.url.split("/")[6]);
      },
      getName(pokemon) {
        return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      },
      showPokemon(id) {
        this.$emit('show-pokemon', id);
      },
    },
    computed: {
      filteredPokemons() {
        return this.pokemons.filter((item) => {
          const id = this.getId(item);
          return item.name.toLowerCase().includes(this.search.toLowerCase()) || id.toString() === this.search;
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .content-container {
    margin-top: 120px;
  }
  
  .pokemon-card {
    background-color: #ffffff93;
    color: rgb(0, 0, 0);
    border-radius: 16px;
    transition: transform 0.2s ease;
  }
  
  .pokemon-card:hover {
    transform: scale(1.05);
    background-color: #e44e4e;
  }
  </style>