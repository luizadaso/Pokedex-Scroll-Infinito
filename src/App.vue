<template>
  <v-app>
    <v-container>
      <div class="fixed-header">
        <h1 class="fixed-title">Pokedex de Ana</h1>
        <v-text-field
          v-model="search"
          label="Buscar Pokémon"
          outlined
          dense
          color="yellow"
          class="red-outline fixed-search"
        ></v-text-field>
      </div>
      <v-container class="content-container">
        <v-row>
          <v-col class="text-center" cols="3" v-for="pokemon in filtrar_pokemons" :key="pokemon.name">
            <v-card class="pokemon-card" elevation="8" @click="mostrar_pokemon(get_id(pokemon))">
              <v-container>
                <img 
                  :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${get_id(pokemon)}.png`"
                  :alt="pokemon.name" 
                  width="55%"
                />
                <h2 class="text-center">{{ get_name(pokemon) }}</h2>
                <p class="text-center">ID: {{ get_id(pokemon) }}</p>
                <p></p>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
    <v-dialog v-model="mostrar_dialog" width="50%">
      <v-card v-if="selecionar_pokemon" class="pokemon-dialog">
        <v-row>
          <v-col class="d-flex justify-end">
            <v-btn icon @click="fechar_dialog" class="close-btn">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-container>
          <v-row class="d-flex align-center">
            <v-col cols="8" class="text-center">
              <h1>{{ get_name(selecionar_pokemon) }}</h1>
              <v-chip>Tipo:</v-chip>
              <v-chip class="ml-2" v-for="type in selecionar_pokemon.types" :key="type.slot">
                {{ type.type.name }}
              </v-chip>
              <v-divider class="my-4"></v-divider>
              <v-chip>Altura: {{ selecionar_pokemon.height * 2.54 }} cm</v-chip>
              <v-chip class="ml-2">Peso: {{ (selecionar_pokemon.weight * 0.453592).toFixed(0) }} kg</v-chip>
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
          <v-simple-table fixed-header height="100%">
            <template>
              <thead>
                <tr>
                  <th class="text-left">Level</th>
                  <th class="text-left">Nome</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in filter_moves(selecionar_pokemon)" :key="item.move.name">
                  <td>0</td>
                  <td>{{ item.move.name }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-container>
      </v-card>
    </v-dialog>
    <footer class="fixed-footer">
      <a href="https://github.com/luizadaso" target="_blank" rel="noopener noreferrer">
        Desenvolvido por @luizadaso
      </a>
    </footer>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',

  data() {
    return {
      pokemons: [],
      search: "",
      mostrar_dialog: false,
      selecionar_pokemon: null,
    };
  },

  mounted() {
    console.log("Aplicação executada.");
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=151").then((response) => {
      this.pokemons = response.data.results;
    });
  },

  methods: {
    get_id(pokemon) {
      return Number(pokemon.url.split("/")[6]);
    },

    get_name(pokemon) {
      return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    },

    mostrar_pokemon(id) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) => {
        this.selecionar_pokemon = response.data;
        this.mostrar_dialog = !this.mostrar_dialog;
      });
    },

    filter_moves(pokemon) {
      return pokemon.moves.filter((item) => {
        let include = false;
        for (let version of item.version_group_details) {
          console.log(version.version_group);
          if (version.version_group.name == "sword-shield" && version.move_learn_method.name != "machine") {
            include = true;
          }
        }
        return include;
      });
    },

    fechar_dialog() {
      this.selecionar_pokemon = null;
      this.mostrar_dialog = false;
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

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #e44e4e;
  z-index: 1000;
  padding: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.fixed-title {
  text-align: center;
  margin: 0;
}

.fixed-search {
  margin-top: 10px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.content-container {
  margin-top: 120px;
}

.position-relative {
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}

.red-outline .v-input__control .v-input__slot::before {
  border-color: red !important;
}

.red-outline .v-input__control .v-input__slot::after {
  border-color: red !important;
}

.fixed-title {
  font-family: "Lilita One", sans-serif;
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

.pokemon-dialog {
  background-color: #eea472;
  color: white;
  border-radius: 16px;
}

.v-card-title.headline {
  font-family: 'Press Start 2P', sans-serif;
  font-size: 1rem;
  color: #fff;
  text-shadow: 1px 1px #000;
  justify-content: center;
}

.v-avatar img {
  image-rendering: pixelated;
}

.v-card-text p {
  margin: 0.5rem 0;
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
}
</style>