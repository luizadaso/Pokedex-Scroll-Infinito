<template>
  <v-app>
    <v-container>
      <v-select
        v-model="currentLocale"
        :items="locales"
        @change="changeLocale"
      ></v-select>
      <SearchBar 
        :search="search" 
        :hideSearch="showDialog" 
        @update:search="search = $event" 
        @update:filter="updateFilter"
        @update:type="updateType"
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
        {{ $t('developedBy') }}
      </a>
    </footer>
  </v-app>
</template>

<script>
import axios from 'axios';
import SearchBar from './components/SearchBar.vue';
import PokemonList from './components/PokemonList.vue';
import PokemonDialog from './components/PokemonDialog.vue';
import i18n from './plugins/i18n';

export default {
  name: 'App',
  components: {
    SearchBar,
    PokemonList,
    PokemonDialog,
  },
  data() {
    return {
      currentLocale: 'pt',
      locales: [
        { text: 'Português', value: 'pt' },
        { text: 'English', value: 'en' },
        { text: 'Español', value: 'es' },
      ],
      pokemons: [],
      displayedPokemons: [],
      search: "",
      showDialog: false,
      selectedPokemon: null,
      limit: 50,
      offset: 0,
      loading: false,
      selectedFilter: 'name',
      selectedType: null,
    };
  },
  watch: {
    currentLocale(newLocale) {
      this.changeLocale(newLocale);
    },
    '$i18n.locale': function() {
      document.title = this.$t('pageTitle');
    },
  },
  mounted() {
    console.log("Aplicação executada.");
    this.loadPokemons();
  },
  methods: {
    loadPokemons() {
      if (this.loading) return;
      this.loading = true;
      let url = `https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`;
      if (this.selectedType) {
        url = `https://pokeapi.co/api/v2/type/${this.selectedType}`;
      }
      axios.get(url).then((response) => {
        if (this.selectedType) {
          this.pokemons = response.data.pokemon.map(p => p.pokemon);
        } else {
          this.pokemons = [...this.pokemons, ...response.data.results];
        }
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
    updateType(type) {
      this.selectedType = type;
      this.offset = 0; // Reset offset for new type search
      this.pokemons = []; // Clear current pokemons
      this.loadPokemons();
    },
    changeLocale(locale) {
      i18n.locale = locale;
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

.v-select {
  margin-top: 100px;
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