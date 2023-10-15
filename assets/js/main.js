const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
let pokemonCollection = [];

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" data-id="${pokemon.number}">
            <span class="pokeball">
                <em class="button"></em>
            </span>
            <a href="#" class="link no-event">
                <span class="number">#${('000'+pokemon.number).slice(-3)}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </a>
        </li>
    `
}

function convertPokemonToProfile(pokemon){
    return `
        <h1 id="" class="name">${pokemon.name}</h1>
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
            </ol>
        </div>
    `;
}

function addClickToPokemonLinks(){
    const pokemonLinks = document.getElementsByClassName('no-event');
    
    Array.from(pokemonLinks).forEach(function(el){

        // Attach event listener in every new element
        el.addEventListener('click',function(event){
            event.preventDefault();

            console.log(event.target);

            let pokemonId = event.target.closest('li').getAttribute('data-id');

            let pokemonObj = pokemonCollection[pokemonId-1];
            document.querySelector('.content.profile').innerHTML = convertPokemonToProfile(pokemonObj);

            // Change body context from list to profile
            document.body.classList.remove('list');
            document.body.classList.add('profile');
            document.body.classList.add(pokemonObj.type);

            // set the return button to return to pokemon list
            document.getElementById('voltar').setAttribute('data-return','list');
        });
        
        // Remove no-event event class from element
        el.classList.remove('no-event');
    });
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonCollection = pokemons.concat(pokemonCollection);
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml

        // add listener to click link
        addClickToPokemonLinks();
    })
}

loadPokemonItens(offset, limit)



loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

