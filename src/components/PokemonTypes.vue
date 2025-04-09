<template>
    <div>
      <v-chip
        class="ml-2"
        v-for="type in types"
        :key="type.slot"
        :color="getTypeColor(type.type.name)"
      >
        {{ type.type.name.toUpperCase() }}
      </v-chip>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PokemonTypes',
    props: {
      types: {
        type: Array,
        required: true,
      },
    },
    methods: {
      getTypeColor(type) {
        switch (type) {
          case "grass":
            return "green";
          case "poison":
            return "purple";
          case "water":
            return "blue";
          case "bug":
            return "light-green";
          case "ground":
            return "lime darken-3";
          case "fairy":
            return "pink lighten-4";
          case "fighting":
            return "red darken-4";
          case "fire":
            return "red";
          case "flying":
            return "teal";
          case "psychic":
            return "pink";
          case "electric":
            return "yellow darken-2";
          case "rock":
            return "brown";
          case "ice":
            return "cyan";
          case "dragon":
            return "purple";
          case "normal":
            return "grey";
          default:
            return "grey";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .v-chip {
    font-size: 2vh;
  }
  
  @media (max-width: 600px) {
    .v-chip {
      font-size: 60%;
    }
  }
  </style>