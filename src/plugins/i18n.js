// Internacionalização da aplicação (suporte a português, inglês e espanhol)
import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
  en: {
    welcome: 'Ana\'s Pokédex',
    searchPlaceholder: 'Search Pokémon',
    filterBy: 'Filter by:',
    name: 'Name',
    id: 'ID',
    type: 'Type',
    developedBy: 'Developed by @luizadaso',
    noEvolution: 'No evolution found',
    moves: 'Moves',
    gameVersions: 'Appearances',
    evolutions: 'Evolutions',
    height: 'Height',
    weight: 'Weight',
    pageTitle: 'Ana\'s Pokédex',
  },
  pt: {
    welcome: 'Pokédex da Ana',
    searchPlaceholder: 'Buscar Pokémon',
    filterBy: 'Filtrar por:',
    name: 'Nome',
    id: 'ID',
    type: 'Tipo',
    developedBy: 'Desenvolvido por @luizadaso',
    noEvolution: 'Nenhuma evolução encontrada',
    moves: 'Movimentos',
    gameVersions: 'Aparições',
    evolutions: 'Evoluções',
    height: 'Altura',
    weight: 'Peso',
    pageTitle: 'Pokédex da Ana',
  },
  es: {
    welcome: 'Pokédex de Ana',
    searchPlaceholder: 'Buscar Pokémon',
    filterBy: 'Filtrar por:',
    name: 'Nombre',
    id: 'ID',
    type: 'Tipo',
    developedBy: 'Desarrollado por @luizadaso',
    noEvolution: 'No se encontró evolución',
    moves: 'Movimientos',
    gameVersions: 'Apariciones',
    evolutions: 'Evoluciones',
    height: 'Altura',
    weight: 'Peso',
    pageTitle: 'Pokédex de Ana',
  },
};

const i18n = new VueI18n({
  locale: 'pt', // idioma padrão
  messages,
});

export default i18n;