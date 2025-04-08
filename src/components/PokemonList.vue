<template>
    <v-container class="content-container">
      <v-row>
        <v-col class="text-center" cols="3" v-for="pokemon in filteredPokemons" :key="pokemon.name">
          <v-card class="pokemon-card" elevation="8" @click="showPokemon(getId(pokemon))">
            <v-container>
              <img 
                :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getId(pokemon)}.png`"
                :alt="pokemon.name" 
                class="pokemon-image"
                width="55%"
              />
              <h2 class="pokemon-name">{{ getName(pokemon) }}</h2>
              <p class="pokemon-id">ID: {{ getId(pokemon) }}</p>
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
    props: {
      pokemons: {
        type: Array,
        required: true,
      },
      search: {
        type: String,
        required: true,
      },
    },
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

.pokemon-name {
  font-size: 2vw; /* Tamanho do texto responsivo */
}

.pokemon-id {
  font-size: 1.5vw; /* Tamanho do texto responsivo */
}

.pokemon-image {
  width: 50%; /* Tamanho da imagem responsivo */
}

@media (max-width: 600px) {
  .pokemon-name {
    font-size: 2.5vw; /* Ajuste para telas menores */
  }
  .pokemon-id {
    font-size: 2vw; /* Ajuste para telas menores */
  }
  .pokemon-image {
    width: 85%; /* Ajuste para telas menores */
  }
}

@media (min-width: 1200px) {
  .pokemon-name {
    font-size: 1.5vw; /* Ajuste para telas maiores */
  }
  .pokemon-id {
    font-size: 1vw; /* Ajuste para telas maiores */
  }
  .pokemon-image {
    width: 40%; /* Ajuste para telas maiores */
  }
}
  </style>