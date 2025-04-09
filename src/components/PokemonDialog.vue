<template>
    <v-dialog :value="showDialog" @input="$emit('update:showDialog', $event)" width="80%">
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
              <v-chip class="ml-2" v-for="type in selectedPokemon.types" :key="type.slot">
                {{ type.type.name }}
              </v-chip>
              <v-divider class="my-4"></v-divider>
              <v-chip>Altura: {{ selectedPokemon.height * 2.54 }} cm</v-chip>
              <v-chip class="ml-2">Peso: {{ (selectedPokemon.weight * 0.453592).toFixed(0) }} kg</v-chip>
            </v-col>
            <v-col cols="3">
              <img
                :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`"
                :alt="selectedPokemon.name" 
                class="pokemon-image-front"
              />
              <img 
              :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${selectedPokemon.id}.png`"
              :alt="selectedPokemon.name + ' back'" 
              class="pokemon-image"
            />
            <img 
              :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${selectedPokemon.id}.png`"
              :alt="selectedPokemon.name + ' shiny'" 
              class="pokemon-image"
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

          if(version.move_learn_method.name == "level-up") {
                return version.level_learned_at;
            }
        }
        return 0;
      },
      filterMoves(pokemon) {
        return pokemon.moves.filter((item) => {
          let include = false;
          for (let version of item.version_group_details) {
            console.log(version.version_group);
            if (version.move_learn_method.name == "level-up") {
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
    background-color: #cad1e9;
    color: rgb(0, 0, 0);
    border-radius: 16px;
    max-height: 80vh;
    overflow-y: auto;
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .pokemon-image-front {
    width: 80%;
  }
  .pokemon-image {
    width: 50%;
  }
  .v-chip {
    font-size: 2vh;
  }

  @media (max-width: 600px) {
  .pokemon-id {
    font-size: 1.8vw;
  }
  .pokemon-image-front {
    width: 130%;
  }
  .pokemon-image {
    width: 100%;
  }
  .v-chip {
    font-size: 60%;
  }
}
  </style>