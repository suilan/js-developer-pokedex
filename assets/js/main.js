const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const returnButton = document.getElementById('voltar')
let pokemonCollection = [];

const maxRecords = 151
const limit = 10
let offset = 0;

function addClickToPokemonLinks(){
    const pokemonLinks = document.getElementsByClassName('no-event');
    
    Array.from(pokemonLinks).forEach(function(el){
        // Remove no-event event class from element
        el.classList.remove('no-event');

        // Attach event listener in every new element
        el.addEventListener('click',function(event){
            event.preventDefault();

            let pokemonId = event.target.closest('li').getAttribute('data-id');

            let pokemonObj = pokemonCollection[pokemonId-1];
            convertPokemonToProfile(pokemonObj);

            // Change body context from list to profile
            document.body.classList.remove('list');
            document.body.classList.add('profile');
            document.body.classList.add(pokemonObj.type);

            // set the return button to return to pokemon list
            document.getElementById('voltar').setAttribute('data-return','list');
        });
        

    });
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonCollection = pokemons.concat(pokemonCollection);
        const newHtml = pokemons.map(convertPokemontoCard).join('')
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

returnButton.addEventListener('click',()=>{
    document.body.classList='';
});
