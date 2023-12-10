# Trilha JS Developer - Pokedex

## Resumo do Projeto
Projeto desenvolvido junto ao programa DIO - Construindo uma Pokedex com Javascript. Treinamento das habilidade de HTML, CSS e Javascript, sem utilização de frameworks e bibliotecas externas.
Foi utilizada como base para este desenvolvimento:
- O projeto no github [JS Developer Pokedex](https://github.com/digitalinnovationone/js-developer-pokedex);
- O design do artista Saepul Nahwan - [Pokedex App](https://dribbble.com/shots/6540871-Pokedex-App); e
- O projeto [PokeAPI](https://pokeapi.co/) disponível online.

![Pokedex Interface](https://cdn.dribbble.com/users/1171520/screenshots/6540871/pokedex2.png)

## Instalação
Para que esse projeto rode, é necessário instalar as seguintes dependencias:
- Node.js
- Http-server (Global)

Para instruções de instalação do Node.js, seguir as instruções disponíveis nestes sites: 
- https://nodejs.org/en/download 
- https://nodejs.org/en/download/package-manager

Para instalação e uso do http-server, seguir instruções descritas aqui: https://www.npmjs.com/package/http-server. Para este projeto utilizamos a instalação global.

Uma vez com as bibliotecas instaladas, basta rodar **http-server .** no diretório raiz do projeto.

## Desenvolvimento
Considerando o exercício para a prática de HTML, CSS e Javascritp, não foi utilizado nenhum framework ou pre-processador.

### Na página
No documento foi acrescentado a seção Profile, onde foi desenvolvido a segunda tela, foco deste trabalho. 
Os pontos de atenção foram: 
- Aplicação das tags corretas(cabeçalhos, seções, links, etc.);
- Separação dos conteúdos na página.

Na pagina também foram acrescentados um favicon, pequenas animações e interações como:
- O **hover dos cards** na seção de listagem, 
- A **transição** da seção Listagem para a Seção Perfil; e 
- A **interação** das tabs na seção Perfil.

Também acrescentamos um componente chamado pokeball, que foi desenvolvido totalmente em CSS+HTML para ser utilzado na página como recurso visual da interface.

### No CSS
No desenvolvimento do CSS, os arquivos foram reorganizados em 5 documento e importados em main.css, para organização da importação.
Os documentos css foram organizados em:
- **Cores**: O mundo pokemon possui uma grande variedade de pokemons com  diferentes tipos e cores, o que acabaou gerando a necessidade de um mapeamento de cores;
- **Globais**: Arquivo voltados para configurações gerais que devem ser utilizadas como guideline para toda a interface;
- **Home**: todos os elementos necessários especificamente a seção de listagem;
- **Profile**: todos os elementos necessários especificamente a seção de Perfil;
- **Pokeball**: arquivo onde foi organizado todos as propriedades do componente pokeball desenvolvido.


### No JS
Os arquivos JS foram organizados em 4: 
- **main.js**: responsável pelos comportamentos e eventos gerais da página;
- **poke-api.js**: responsável pelas chamadas a PokeAPI;
- **pokemon-model.js**: onde foi configurado o model pokemon;
- **render.js**: responsável pela conversão dos dados em estruturas visuais e componentes da página.


### Principais desafios
- A API Pokemon definitivamente foi um desafio. Nem todos os dados estão organizados da forma como a interface se apresenta. Também a documentação, embora bem detalhada, ainda possui alguns pontos de que precisam de maior esclarecimento. Ex: No endpoint de evolution-chain não explica qual id que deve ser usado na chamda: do pokemon ou da evolução.
- Nem todos os assets não estavam disponíveis, foi necessário procurar online ou produzir alguns deles. Ex: coração de like no profile.

### Para finalizar
- Seção Listagem - Desenvolver o Menu Hamburguer
- Seção Listagem - Ao clicar no botão Load more, os eventos de abrir Perfil são perdidos em todos os cards.
- Seção Perfil - Adicionar conteudo a tab Moves.


