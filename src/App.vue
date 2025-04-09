<template>
  <v-app>
    <v-container>
      <SearchBar 
        :search="search" 
        :hideSearch="showDialog" 
        @update:search="search = $event" 
        @update:filter="updateFilter"
      />
      <PokemonList 
        :pokemons="displayedPokemons" 
        :search="search" 
        :filter="selectedFilter"
        @show-pokemon="showPokemon" 
      />
      <div v-intersect="loadMore" class="load-more-trigger"></div>
      <PokemonDialog 
        :showDialog="showDialog" 
        :selectedPokemon="selectedPokemon" 
        @update:showDialog="showDialog = $event" 
        @close-dialog="closeDialog" 
      />
    </v-container>
    <footer class="fixed-footer">
      <a href="https://github.com/luizadaso" target="_blank" rel="noopener noreferrer">
        Desenvolvido por @luizadaso
      </a>
    </footer>
  </v-app>
</template>

<script>
import axios from 'axios';
import SearchBar from './components/SearchBar.vue';
import PokemonList from './components/PokemonList.vue';
import PokemonDialog from './components/PokemonDialog.vue';

export default {
  name: 'App',
  components: {
    SearchBar,
    PokemonList,
    PokemonDialog,
  },
  data() {
    return {
      pokemons: [],
      displayedPokemons: [],
      search: "",
      showDialog: false,
      selectedPokemon: null,
      limit: 50,
      offset: 0,
      loading: false,
      selectedFilter: 'name',
    };
  },
  mounted() {
    console.log("Aplicação executada.");
    this.loadPokemons();
  },
  methods: {
    loadPokemons() {
      if (this.loading) return;
      this.loading = true;
      axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`).then((response) => {
        this.pokemons = [...this.pokemons, ...response.data.results];
        this.displayedPokemons = this.pokemons;
        this.offset += this.limit;
        this.loading = false;
      });
    },
    loadMore(entries) {
      const entry = entries[0];
      if (entry.isIntersecting) {
        this.loadPokemons();
      }
    },
    showPokemon(id) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) => {
        this.selectedPokemon = response.data;
        this.showDialog = true;
      });
    },
    closeDialog() {
      this.selectedPokemon = null;
      this.showDialog = false;
    },
    updateFilter(filter) {
      this.selectedFilter = filter;
    },
  },
};
</script>

<style scoped>
#app {
  background-color: #6ab7f5;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover !important;
  background-position: center;
  min-height: 100vh;
  padding-top: 2rem;
  color: white;
}

.fixed-footer a {
  color: #fff;
  text-decoration: none;
}

.fixed-footer a:hover {
  text-decoration: underline;
}

.fixed-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #e44e4e;
  color: #fff;
  text-align: center;
  padding: 10px 0;
  box-shadow: 0 -2px 4px rgb(255, 255, 255);
}
</style>