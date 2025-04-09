<template>
  <div class="fixed-header">
    <h1 class="fixed-title">Pokédex da Ana
      <img 
        :src="require('../assets/pikachu.png')" 
        alt="pikachu"
        width="38px"
      >
    </h1>
    <v-row v-if="!hideSearch" class="fixed-search">
      <v-col cols="10">
        <v-text-field
          :value="search"
          @input="$emit('update:search', $event)"
          label="Buscar Pokémon"
          outlined
          dense
          color="yellow"
          class="red-outline"
        ></v-text-field>
      </v-col>
      <v-col cols="2" class="d-flex align-center">
        <v-menu
          v-model="filterMenu"
          :close-on-content-click="false"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-filter-variant</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Filtrar por:</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-radio-group v-model="selectedFilter" @change="updateFilter">
                  <v-radio label="Nome" value="name"></v-radio>
                  <v-radio label="ID" value="id"></v-radio>
                  <v-radio label="Tipo" value="type"></v-radio>
                </v-radio-group>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    search: {
      type: String,
      required: true,
    },
    hideSearch: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      filterMenu: false,
      selectedFilter: 'name',
    };
  },
  methods: {
    updateFilter() {
      this.$emit('update:filter', this.selectedFilter);
    },
  },
};
</script>

<style scoped>
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #e44e4e;
  z-index: 1000;
  padding: 10px 0;
  box-shadow: 0 2px 4px rgb(255, 255, 255);
}

.fixed-title {
  font-family: "Lilita One", sans-serif;
  text-align: center;
  margin: 0;
}

.v-btn {
  margin-bottom: 25px;
  margin-left: -10px;
}

.fixed-search {
  margin-top: 0;
  margin-bottom: -2vh;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
</style>