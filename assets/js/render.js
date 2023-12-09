/**
 * Loads the html template for every pokemon register
 * @param {*} pokemon 
 * @returns string
 */
function convertPokemontoCard(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" data-id="${pokemon.id}">
            <span class="pokeball ${pokemon.type}-color"><em class="button"></em></span>
            <a href="#" class="link no-event">
                <span class="number">#${('000'+pokemon.id).slice(-3)}</span>
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
                <span class="item capitalize">
                    <label class="title">Abilities</label> 
                    ${pokemon.details.abilities.map((ability) => ability.ability.name).join(', ')} 
                </span>
            </div>
            <div class="data">
                <h3>Breeding</h3>
                <div class="item">
                    <label class="title">Gender</label> 
                    <div>
                        <i class="icon male-icon"></i> ${(pokemon.species.gender_rate/8)*100}% 
                        <i class="icon female-icon"></i> ${((7-pokemon.species.gender_rate)/8)*100}%
                    </div>
                </div>
                <span class="item capitalize">
                    <label class="title">Egg Groups</label> 
                    ${pokemon.species.egg_groups.map((group) => group.name).join(', ')} 
                </span>
                <span class="item"><label class="title">Egg Cycle</label> ${pokemon.species.hatch_counter} steps </span>
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
            </div>
            <div class="data">
                <h3>Type defenses</h3>
                <p>The effectiveness of each type on <b class="capitalize">${pokemon.name}</b>.</p>
            </div>
            `;
}

function buildEvolutionsSection(pokemon) {
    let response = '';

    if(pokemon.evolutions.length>1){
        
        for (let index = 1; index < pokemon.evolutions.length; index++) {
            const current = pokemon.evolutions[index];
            const previous = pokemon.evolutions[index-1];
            response += `<div class="evolution">
                <div class="evolution-stage">
                    <span class="pokeball"><em class="button"></em></span>
                    <div class="preview">
                        <img src="${previous.loadPhoto()}">
                        <label class="title">${previous.name}</label>
                    </div>
                </div>
                <div class="level">
                    <span class="arrow">→</span><br>
                    <span>Lvl ${current.min_level}</span>
                </div>
                <div class="evolution-stage">
                    <span class="pokeball"><em class="button"></em></span>
                    <div class="preview">
                        <img src="${current.loadPhoto()}">
                        <label class="title">${current.name}</label>
                    </div>
                </div>
            </div>`;
        }
        
        }
        else{
            response = '<div class="evolution">No evolution available</div>';
        }

    return response;
}
