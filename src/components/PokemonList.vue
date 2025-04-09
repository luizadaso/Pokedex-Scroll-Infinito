<template>
  <v-container class="content-container">
    <v-row>
      <v-col
        class="text-center"
        cols="4"
        sm="4"
        md="3"
        lg="2"
        xl="2"
        v-for="pokemon in filteredPokemons" 
        :key="pokemon.name"
      >
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
    filter: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      filteredPokemons: [],
    };
  },
  watch: {
    search: 'filterPokemons',
    filter: 'filterPokemons',
    pokemons: 'filterPokemons',
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
    async fetchPokemonDetails(pokemon) {
      const response = await fetch(pokemon.url);
      return await response.json();
    },
    async filterPokemons() {
      if (this.filter === 'name') {
        this.filteredPokemons = this.pokemons.filter(pokemon =>
          pokemon.name.toLowerCase().includes(this.search.toLowerCase())
        );
      } else if (this.filter === 'id') {
        this.filteredPokemons = this.pokemons.filter(pokemon =>
          this.getId(pokemon).toString().includes(this.search)
        );
      } else if (this.filter === 'type') {
        const filteredPokemons = [];
        for (const pokemon of this.pokemons) {
          const details = await this.fetchPokemonDetails(pokemon);
          if (details.types.some(type => type.type.name.toLowerCase().includes(this.search.toLowerCase()))) {
            filteredPokemons.push(pokemon);
          }
        }
        this.filteredPokemons = filteredPokemons;
      } else {
        this.filteredPokemons = this.pokemons;
      }
    },
  },
  mounted() {
    this.filterPokemons();
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

@media (max-width: 600px) {
  .pokemon-name {
    font-size: 2.3vw; /* Ajuste para telas menores */
  }
  .pokemon-id {
    font-size: 2vw; /* Ajuste para telas menores */
  }
  .pokemon-image {
    width: 100%; /* Ajuste para telas menores */
  }
}

@media (min-width: 1200px) {
  .pokemon-name {
    font-size: 1.2vw; /* Ajuste para telas maiores */
  }
  .pokemon-id {
    font-size: 0.8vw; /* Ajuste para telas maiores */
  }
  .pokemon-image {
    width: 80%; /* Ajuste para telas maiores */
  }
}
</style>