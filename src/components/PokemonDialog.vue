<template>
  <v-dialog :value="showDialog" @input="$emit('update:showDialog', $event)" max-width="80vh">
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
            <v-divider class="my-4"></v-divider>
            <PokemonTypes :types="selectedPokemon.types" />
            <v-divider class="my-4"></v-divider>
          </v-col>
          <v-col cols="3">
            <img
              :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${selectedPokemon.id}.gif`"
              :alt="selectedPokemon.name" 
              class="pokemon-image-front"
            />
          </v-col>
        </v-row>
        <v-tabs v-model="activeTab">
          <v-tab>{{ $t('moves') }}</v-tab>
          <v-tab>{{ $t('gameVersions') }}</v-tab>
          <v-tab>{{ $t('evolutions') }}</v-tab>
          <v-tab>Sprites</v-tab>
        </v-tabs>
        <v-tabs-items v-model="activeTab">
          <v-tab-item>
            <v-data-table
              :headers="moveHeaders"
              :items="filterMoves(selectedPokemon)"
              item-key="move.name"
              class="elevation-1"
            >
              <template v-slot:item="{ item }">
                <tr>
                  <td>{{ item.level }}</td>
                  <td>{{ item.move.name }}</td>
                </tr>
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
          <v-tab-item>
            <v-row v-if="evolutions.length">
              <v-col v-for="evolution in evolutions" :key="evolution.id" class="text-center">
                <img :src="evolution.image" :alt="evolution.name" class="pokemon-image-evolutions" />
                <div>{{ evolution.name }}</div>
                <div v-if="evolution.level">Level: {{ evolution.level }}</div>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col class="text-center">
                <div>{{ $t('noEvolution') }}</div>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-tabs v-model="activeSpriteTab">
              <v-tab>Principal</v-tab>
              <v-tab>dream_world</v-tab>
              <v-tab>home</v-tab>
              <v-tab>official-artwork</v-tab>
              <v-tab>showdown</v-tab>
            </v-tabs>
            <v-tabs-items v-model="activeSpriteTab">
              <v-tab-item>
                <v-row>
                  <v-col cols="12" class="text-center">
                    <img
                      v-for="(sprite, index) in spriteUrls"
                      :key="index"
                      :src="sprite"
                      :alt="`Sprite ${index + 1}`"
                      class="pokemon-sprite"
                    />
                  </v-col>
                </v-row>
              </v-tab-item>
              <v-tab-item>
                <v-row>
                  <v-col cols="12" class="text-center">
                    <img
                      v-for="(sprite, index) in dreamWorldSprites"
                      :key="index"
                      :src="sprite"
                      :alt="`Dream World Sprite ${index + 1}`"
                      class="pokemon-sprite"
                    />
                  </v-col>
                </v-row>
              </v-tab-item>
              <v-tab-item>
                <v-row>
                  <v-col cols="12" class="text-center">
                    <img
                      v-for="(sprite, index) in homeSprites"
                      :key="index"
                      :src="sprite"
                      :alt="`Home Sprite ${index + 1}`"
                      class="pokemon-sprite"
                    />
                  </v-col>
                </v-row>
              </v-tab-item>
              <v-tab-item>
                <v-row>
                  <v-col cols="12" class="text-center">
                    <img
                      v-for="(sprite, index) in officialArtworkSprites"
                      :key="index"
                      :src="sprite"
                      :alt="`Official Artwork Sprite ${index + 1}`"
                      class="pokemon-sprite"
                    />
                  </v-col>
                </v-row>
              </v-tab-item>
              <v-tab-item>
                <v-row>
                  <v-col cols="12" class="text-center">
                    <img
                      v-for="(sprite, index) in showdownSprites"
                      :key="index"
                      :src="sprite"
                      :alt="`Showdown Sprite ${index + 1}`"
                      class="pokemon-sprite"
                    />
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs-items>
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';
import PokemonTypes from './PokemonTypes.vue';

export default {
  name: 'PokemonDialog',
  components: {
    PokemonTypes,
  },
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
      activeSpriteTab: 0,
      moveHeaders: [
        { text: 'Level', value: 'level', sortable: false },
        { text: 'Nome', value: 'move.name', sortable: false },
      ],
      gameHeaders: [
        { text: 'Versão', value: 'version.name', sortable: false },
      ],
      evolutions: [],
      spriteUrls: [],
      dreamWorldSprites: [],
      homeSprites: [],
      officialArtworkSprites: [],
      showdownSprites: [],
    };
  },
  watch: {
    selectedPokemon(newVal) {
      if (newVal) {
        this.fetchEvolutions(newVal);
        this.fetchSprites(newVal);
      }
    },
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
    async fetchEvolutions(pokemon) {
      try {
        const speciesResponse = await axios.get(pokemon.species.url);
        const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
        const evolutionResponse = await axios.get(evolutionChainUrl);
        this.evolutions = this.parseEvolutions(evolutionResponse.data.chain);
      } catch (error) {
        console.error('Erro ao buscar evoluções:', error);
      }
    },
    parseEvolutions(chain) {
      const evolutions = [];
      let current = chain;

      while (current) {
        const level = current.evolution_details.length ? current.evolution_details[0].min_level : null;
        evolutions.push({
          id: this.getPokemonIdFromUrl(current.species.url),
          name: current.species.name,
          level: level,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.getPokemonIdFromUrl(current.species.url)}.png`,
        });
        current = current.evolves_to.length ? current.evolves_to[0] : null;
      }

      return evolutions;
    },
    getPokemonIdFromUrl(url) {
      const parts = url.split('/');
      return parts[parts.length - 2];
    },
    async fetchSprites(pokemon) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
        const sprites = response.data.sprites;
        this.spriteUrls = Object.values(sprites).filter(sprite => typeof sprite === 'string');
        this.dreamWorldSprites = Object.values(sprites.other.dream_world).filter(sprite => typeof sprite === 'string');
        this.homeSprites = Object.values(sprites.other.home).filter(sprite => typeof sprite === 'string');
        this.officialArtworkSprites = Object.values(sprites.other['official-artwork']).filter(sprite => typeof sprite === 'string');
        this.showdownSprites = Object.values(sprites.versions['generation-v']['black-white'].animated).filter(sprite => typeof sprite === 'string');
      } catch (error) {
        console.error('Erro ao buscar sprites:', error);
      }
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
  overflow-y: auto;
  max-height: 75vh;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}

.pokemon-image-front {
  width: 100%;
}

.pokemon-image-evolutions {
  width: 40%;
}

.pokemon-sprite {
  width: 100px;
  margin: 5px;
}

@media (max-width: 600px) {
  .pokemon-dialog {
    max-height: 65vh;
  }

  .pokemon-id {
    font-size: 1.8vw;
  }

  .pokemon-image-front {
    width: 160%;
  }

  .pokemon-image-evolutions {
    width: 80%;
  }

  .pokemon-sprite {
    width: 100px;
  }
}
</style>