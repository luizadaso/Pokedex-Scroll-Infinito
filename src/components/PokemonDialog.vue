<template>
    <v-dialog :value="showDialog" @input="$emit('update:showDialog', $event)" width="50%">
      <v-card v-if="selectedPokemon" class="pokemon-dialog">
        <v-row>
          <v-col class="d-flex justify-end">
            <v-btn icon @click="closeDialog" class="close-btn">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-container>
          <v-row class="d-flex align-center">
            <v-col cols="8" class="text-center">
              <h1>{{ getName(selectedPokemon) }}</h1>
              <v-chip>Tipo:</v-chip>
              <v-chip class="ml-2" v-for="type in selectedPokemon.types" :key="type.slot">
                {{ type.type.name }}
              </v-chip>
              <v-divider class="my-4"></v-divider>
              <v-chip>Altura: {{ selectedPokemon.height * 2.54 }} cm</v-chip>
              <v-chip class="ml-2">Peso: {{ (selectedPokemon.weight * 0.453592).toFixed(0) }} kg</v-chip>
            </v-col>
            <v-col cols="4">
              <img 
                :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`"
                :alt="selectedPokemon.name" 
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
                <tr v-for="item in filterMoves(selectedPokemon)" :key="item.move.name">
                  <td>{{ getMoveLevel(item) }}</td>
                  <td>{{ item.move.name }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-container>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    name: 'PokemonDialog',
    props: {
      showDialog: {
        type: Boolean,
        required: true,
      },
      selectedPokemon: {
        type: Object,
        required: false,
      },
    },
    methods: {
      getName(pokemon) {
        return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      },
      getMoveLevel(move) {
        for (let version of move.version_group_details) {
          console.log(version);
        }
        return 0;
      },
      filterMoves(pokemon) {
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
      closeDialog() {
        this.$emit('update:showDialog', false);
      },
    },
  };
  </script>
  
  <style scoped>
  .pokemon-dialog {
    background-color: #eea472;
    color: white;
    border-radius: 16px;
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  </style>