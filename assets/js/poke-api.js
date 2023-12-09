
const pokeApi = {}

let pokeEvolutions = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.id = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    pokemon.details = pokeDetail;

    pokemon.evolutions = pokeApi.getPokemonSpecies(pokemon);

    return pokemon
}

function convertEvolutionsToObjectFormat(evolution) {

    let evolutionsArray = [];

    let pokemon = new Pokemon()
    pokemon.min_level = evolution.evolution_details[0].min_level;
    pokemon.name = evolution.species.name;
    pokemon.id = evolution.species.url.match(/\/([0-9]+)\//)[1];

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

pokeApi.getPokemonSpecies = (pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`;

    return fetch(url)
        .then((response) => response.json())
        .then((species)=>{
            pokemon.species = {};
            pokemon.species.gender_rate = species.gender_rate;
            pokemon.species.egg_groups = species.egg_groups;
            pokemon.species.hatch_counter = species.hatch_counter;
            pokeApi.getPokemonEvolution(pokemon, species.evolution_chain);
        })
}

pokeApi.getPokemonEvolution = (pokemon, evolution_chain) => {
    const url = evolution_chain.url;

    return fetch(url)
        .then((response) => response.json())
        .then((evolutions)=>{
            let pokeEvolution = [];

            // Creates the first step evolution
            let newPokemon = new Pokemon()
            newPokemon.min_level = 0;
            newPokemon.name = evolutions.chain.species.name;
            newPokemon.id = evolutions.chain.species.url.match(/\/([0-9]+)\//)[1];

            // Build array of evolution
            pokeEvolution = convertEvolutionsToObjectFormat(evolutions.chain.evolves_to[0]);
            pokeEvolution.unshift(newPokemon);

            pokemon.evolutions = pokeEvolution;

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


