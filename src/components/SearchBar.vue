<template>
  <div class="fixed-header">
    <h1 class="fixed-title">Pokédex de Ana</h1>
    <v-text-field
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

.red-outline .v-input__control .v-input__slot::before {
  border-color: red !important;
}

.red-outline .v-input__control .v-input__slot::after {
  border-color: red !important;
}
</style>