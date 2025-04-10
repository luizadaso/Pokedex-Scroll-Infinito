<template>
  <div class="fixed-header">
    <h1 class="fixed-title">{{ $t('welcome') }}
      <img 
        :src="require('../assets/pikachu.png')" 
        alt="pikachu"
        width="38px"
      >
    </h1>
<v-row v-if="!hideSearch" class="fixed-search" justify="center" align="center">
      <v-col cols="1" class="d-flex align-center justify-end">
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
                  <v-list-item-title>{{ $t('filterBy') }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-radio-group v-model="selectedFilter" @change="updateFilter">
                  <v-radio :label="$t('name')" value="name"></v-radio>
                  <v-radio :label="$t('id')" value="id"></v-radio>
                </v-radio-group>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-col>
      <v-col cols="6">
        <v-text-field
          :value="search"
          @input="$emit('update:search', $event)"
          :label="$t('searchPlaceholder')"
          outlined
          dense
          color="yellow"
          class="red-outline"
        ></v-text-field>
      </v-col>
      <v-col cols="3" class="d-flex align-center">
        <v-menu
          v-model="typeMenu"
          :close-on-content-click="false"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" outlined>
              {{ selectedType ? selectedType : 'Todos' }}
            </v-btn>
          </template>
          <v-card>
            <v-list class="scrollable-list">
              <v-list-item @click="selectType(null)">
                <v-list-item-title>Todos</v-list-item-title>
              </v-list-item>
              <v-list-item
                v-for="type in types"
                :key="type.name"
                @click="selectType(type.name)"
              >
                <v-list-item-title>{{ type.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios';

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
      typeMenu: false,
      selectedFilter: 'name',
      selectedType: null,
      types: [],
    };
  },
  created() {
    this.fetchTypes();
  },
  methods: {
    updateFilter() {
      this.$emit('update:filter', this.selectedFilter);
    },
    fetchTypes() {
      axios.get('https://pokeapi.co/api/v2/type')
        .then(response => {
          this.types = response.data.results;
        })
        .catch(error => {
          console.error('Error fetching types:', error);
        });
    },
    selectType(type) {
      this.selectedType = type;
      this.$emit('update:type', type);
      this.typeMenu = false;
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
  margin-bottom: 26px;
  margin-right: -15px;
}

.fixed-search {
  margin-bottom: -15px;
  margin-top: 5px;
  width: 80%;
  margin-left: 15%;
  margin-right: auto;
}

.scrollable-list {
  max-height: 200px;
  overflow-y: auto;
}

@media (max-width: 600px) {
  .fixed-search {
    margin-left: 0px;
    width: 100%;
  }
}
</style>