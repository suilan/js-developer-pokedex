/**
 * Loads the html template for every pokemon register
 * @param {*} pokemon 
 * @returns string
 */
function convertPokemontoCard(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" data-id="${pokemon.number}">
            <span class="pokeball ${pokemon.type}-color"><em class="button"></em></span>
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
    document.querySelector('header .pokeball').classList.add(pokemon.type+'-color');
    document.querySelector('.profile .name').innerText = pokemon.name;
    document.querySelector('.profile .detail .types').innerHTML = pokemon.types.map(
        (type) => `<li class="type">${type}</li>`).join('');

    const pokeImage = document.querySelector('.profile .detail img')
    pokeImage.src = pokemon.photo;
    pokeImage.alt = pokemon.name;

    document.querySelector('.about-section').innerHTML = buildAboutSection(pokemon);
    document.querySelector('.stats-section').innerHTML = buildStatsSection(pokemon);
    document.querySelector('.evolutions-section').innerHTML = buildEvolutionsSection(pokemon);

}

function buildAboutSection(pokemon) {
    return `<div class="data">
                <span class="item capitalize"><label class="title">Species</label> ${pokemon.details.species.name} </span>
                <span class="item"><label class="title">Height</label>${((pokemon.details.height*10)/2.54).toFixed(2)} (${pokemon.details.height*10} cm) </span>
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

function buildStatsSection(pokemon) {
    return `<div class="data">
                ${pokemon.details.stats.map((stat) => `<div class="item capitalize">
                    <label class="title">${stat.stat.name}</label>
                    <span>
                        ${stat.base_stat}
                        <div class="bar"><span class="progress-bar ${stat.base_stat>50?'green':''}" style="width:${stat.base_stat}%;"></span></div>
                    </span>
                </div>`).join('')}
                <h3>Type defenses</h3>
            </div>
            `;
}

function buildEvolutionsSection(pokemon) {
    console.log(pokemon);
    return `<div class="data">
                <h3>Evolution Chain</h3>
                <div class="evolution">
                    <div class="evolution-stage">
                        <span class="pokeball"><em class="button"></em></span>
                        <div class="preview">
                            <img src="${pokemon.loadPhoto()}">
                            <label class="title">${pokemon.name}</label>
                        </div>
                    </div>
                    <div class="level">
                        <span class="arrow">→</span><br>
                        <span>Lvl ${pokemon.evolutions[0].min_level}</span>
                    </div>
                    <div class="evolution-stage">
                        <span class="pokeball"><em class="button"></em></span>
                        <div class="preview">
                            <img src="${pokemon.evolutions[0].loadPhoto()}">
                            <label class="title">${pokemon.evolutions[0].name}</label>
                        </div>
                    </div>
                </div>
                ${pokemon.evolutions.map((evo) => `<div class="item">
                    <div class="title">
                        <img>
                        <label class="title">${evo.name}</label>
                    </div>
                    <span>
                        ${evo.min_level}
                    </span>
                </div>`).join('')}
            </div>
            `;
}
