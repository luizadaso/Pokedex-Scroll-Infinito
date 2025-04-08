<template>
  <div class="fixed-header">
    <h1 class="fixed-title">Pokédex de Ana</h1>
    <v-text-field
      v-if="!hideSearch"
      :value="search"
      @input="$emit('update:search', $event)"
      label="Buscar Pokémon"
      outlined
      dense
      color="yellow"
      class="red-outline fixed-search"
    ></v-text-field>
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

.fixed-search {
  margin-top: 10px;
  margin-bottom: -10px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
</style>