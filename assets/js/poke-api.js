
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.details = pokeDetail;

    pokemon.evolutions = pokeApi.getPokemonEvolution(pokemon);

    return pokemon
}

function convertEvolutionsToObjectFormat(evolution) {

    let response;
    let minLevel = evolution.evolution_details[0].min_level;
    let evolutionsArray = [];

    let pokemon = new Pokemon()
    pokemon.min_level = evolution.evolution_details[0].min_level;
    pokemon.name = evolution.species.name;
    pokemon.number = evolution.species.url.match(/\/([0-9]+)\//)[1];

    evolutionsArray.push(pokemon);

    if(evolution.evolves_to.length>0){
        evolutionsArray = evolutionsArray.concat(convertEvolutionsToObjectFormat(evolution.evolves_to[0]));
    }

    return evolutionsArray;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemonEvolution = (pokemon) => {
    const url = `https://pokeapi.co/api/v2/evolution-chain/${pokemon.number}/`;

    return fetch(url)
        .then((response) => response.json())
        .then((evolutions)=>{
            console.log(evolutions)
            pokemon.evolutions = convertEvolutionsToObjectFormat(evolutions.chain.evolves_to[0]);
        })
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}


