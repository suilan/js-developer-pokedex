/**
 * Loads the html template for every pokemon register
 * @param {*} pokemon 
 * @returns string
 */
function convertPokemontoCard(pokemon) {
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

/**
 * Returns the html template for the pokemon profile 
 * @param {*} pokemon 
 * @returns 
 */
function convertPokemonToProfile(pokemon){
    // Load Initial data
    document.querySelector('.profile .name').innerText = pokemon.name;
    document.querySelector('.profile .detail .types').innerHTML = pokemon.types.map(
        (type) => `<li class="type">${type}</li>`).join('');

    const pokeImage = document.querySelector('.profile .detail img')
    pokeImage.src = pokemon.photo;
    pokeImage.alt = pokemon.name;

    document.querySelector('.about-section').innerHTML = buildAboutSection(pokemon);

}

function buildAboutSection(pokemon) {
    return `<div class="data">
                <span class="item capitalize"><label class="title">Species</label> ${pokemon.details.species.name} </span>
                <span class="item"><label class="title">Height</label>${(pokemon.details.height*10)/2.54} (${pokemon.details.height*10} cm) </span>
                <span class="item"><label class="title">Weight</label> ${pokemon.details.weight} hg </span>
                <span class="item capitalize"><label class="title">Abilities</label> ${pokemon.details.abilities.map(
                    (ability) => ability.ability.name).join(', ')} </span>
            </div>
            <div class="data">
                <h3>Breeding</h3>
                <span class="item"><label class="title">Gender</label> ${pokemon.details.species.name} </span>
                <span class="item"><label class="title">Egg Groups</label> ${pokemon.details.species.name} </span>
                <span class="item"><label class="title">Egg Cycle</label> ${pokemon.details.species.name} </span>
            </div>
            `;
    
}

