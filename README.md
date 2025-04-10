# Pokédex da Ana <img src="https://github.com/user-attachments/assets/0828d876-3b45-4a29-85e2-3c7ea3cd7a24" width="40px" alt="pikachu"/>

<img src="https://github.com/user-attachments/assets/396fc43a-870b-438d-9dce-3c33193157dc" width="63%" alt="desktop"/> <img src="https://github.com/user-attachments/assets/e6125b7b-f609-433b-9271-b1cccf443316" width="15%" alt="smartphone"/>

## Descrição

**Pokédex da Ana** é uma aplicação web que permite aos usuários buscar e visualizar informações detalhadas sobre Pokémon. A aplicação utiliza a API do [PokeAPI](https://pokeapi.co/) para obter dados em tempo real e oferece uma interface amigável e responsiva construída com Vue.js e Vuetify.

## Funcionalidades

- **Listagem dos Pokémon com Scroll Infinito**: A aplicação carrega Pokémon continuamente conforme o usuário rola a página, proporcionando uma experiência de navegação fluida.
- **Filtros de Busca**: Os usuários podem filtrar Pokémon por nome/espécie, ID e tipo, facilitando a localização do Pokémon desejado.
- **Detalhamento Completo do Pokémon**:
  - **Sprites**: Exibição de todos os sprites do Pokémon, incluindo as versões normais, de costas e brilhantes.
  - **Movimentos de Ataque**: Listagem completa dos movimentos de ataque que o Pokémon pode aprender.
  - **Evoluções**: Exibição das evoluções do Pokémon, quando há.
  - **Games**: Listagem de todos os jogos em que o Pokémon está presente.
 
### Recursos Adicionais

- **Responsividade**: A aplicação foi projetada para ser responsiva, oferecendo uma experiência de usuário otimizada para desktop, notebook e smartphones.
- **Suporte Multilíngue**: A aplicação suporta múltiplas línguas, incluindo português, inglês e espanhol, permitindo que usuários de diferentes regiões utilizem a aplicação em seu idioma preferido.

## Tecnologias Utilizadas

- **Vue.js**: Framework JavaScript progressivo para construção de interfaces de usuário.
- **Vuetify**: Biblioteca de componentes UI para Vue.js baseada no Material Design.
- **Vue Router**: Gerenciamento de rotas para navegação entre páginas.
- **Vue I18n**: Internacionalização para suporte a múltiplos idiomas.
- **Axios**: Cliente HTTP para fazer requisições à API do PokeAPI.
- **PokeAPI**: API pública para obter dados sobre Pokémon.

### Estrutura do Projeto

```
Pokedex-da-Ana/
├── node_modules/...
├── public/
│   ├── favicon.png
│   └── index.html
├── src/
│   ├── assets/
├── │   ├── pikachu.png
│   │   └── preview.png
│   ├── components/
│   │   ├── PokemonDialog.vue
│   │   ├── PokemonList.vue
│   │   ├── PokemonTypes.vue
│   │   └── SearchBar.vue
│   ├── plugins/
│   │   ├── i18n.js
│   │   └── vuetify.js
│   ├── App.vue
│   └── main.js
├── .gitignore
├── babel.config.js
├── jsconfig.json
├── package.json
├── package-lock.json
├── README.md
└── vue.config.js
```

## Instalação

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/luizadaso/Pokedex-da-Ana.git
   cd Pokedex-da-Ana

## Autora

Para mais informações, sinta-se à vontade para entrar em contato:

<div align="left">
  <img src="https://github.com/user-attachments/assets/57cac2a3-49b1-4a0a-aef3-e968523971eb" width="15%" alt="autora" />
</div>

- [Github](https://github.com/luizadaso)
- [Linkedin](https://www.linkedin.com/in/luizadaso)
