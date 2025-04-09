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
          <v-tabs v-model="activeTab">
            <v-tab>Movimentos</v-tab>
            <v-tab>Versões de Jogos</v-tab>
          </v-tabs>
          <v-tabs-items v-model="activeTab">
            <v-tab-item>
              <v-data-table
                :headers="moveHeaders"
                :items="filterMoves(selectedPokemon)"
                item-key="move.name"
                show-expand
                class="elevation-1"
              >
                <template v-slot:expanded-item="{ headers, item }">
                  <td :colspan="headers.length">
                    <v-list dense>
                      <v-list-item v-for="version in item.version_group_details" :key="version.version_group.name">
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ version.version_group.name }}: Level {{ version.level_learned_at }}
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </td>
                </template>
              </v-data-table>
            </v-tab-item>
            <v-tab-item>
              <v-data-table
                :headers="gameHeaders"
                :items="selectedPokemon.game_indices"
                item-key="version.name"
                class="elevation-1"
              >
                <template v-slot:item="{ item }">
                  <tr>
                    <td>{{ item.version.name }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-tab-item>
          </v-tabs-items>
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
    data() {
      return {
        activeTab: 0,
        moveHeaders: [
          { text: 'Level', value: 'level' },
          { text: 'Nome', value: 'move.name' },
        ],
        gameHeaders: [
          { text: 'Versão', value: 'version.name' },
        ],
      };
    },
    methods: {
      getName(pokemon) {
        return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      },
      getMoveLevel(move) {
        for (let version of move.version_group_details) {
          if (version.move_learn_method.name === 'level-up') {
            return version.level_learned_at;
          }
        }
        return 0;
      },
      filterMoves(pokemon) {
        return pokemon.moves
          .filter((item) => {
            return item.version_group_details.some(
              (version) => version.move_learn_method.name === 'level-up'
            );
          })
          .map((item) => ({
            ...item,
            level: this.getMoveLevel(item),
          }))
          .sort((a, b) => a.level - b.level);
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