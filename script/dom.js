import { pokemonUrl, pokemonAbility, pokemonStats } from "./fetch.js"

const findChampionButton = document.querySelector('#findChampion')
const myTeamButton = document.querySelector('#myTeam')
const searchPokemonNav = document.querySelector('#contentSearch')
const searchPokemonInput = document.querySelector('#searchChampion')
const cardContainer = document.querySelector('#pokemonCardList')


// Visible or invisible 
const invisible = 'none'
const visible = 'block'

// PokemonStats
function pokemonStatFunction() {
	let stat = {
		image: document.createElement('img'),
		name: document.createElement('p'),
		ability: document.createElement('p'),
		stats: document.createElement('p')
	}
	return stat
}



// FindChampion button
findChampionButton.addEventListener('click', async () => {
	searchPokemonNav.style.display = visible
	const findUrl = pokemonUrl
	const abilityUrl = pokemonAbility
	const statsUrl = pokemonStats

	let response = await fetch(findUrl)
	let data = await response.json()

fetchPokemon()
})

// MyTeam button
myTeamButton.addEventListener('click', () => {
	searchPokemonNav.style.display = invisible
})

// LocalStorage list
let pokemonList = []
const fetchPokemon = () => {
    const baseUrl = pokemonUrl;
    const pokemonList = [];
  
    for (let i = 1; i <= 151; i++) {
      const url = `${baseUrl}${i}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const pokemon = {
            name: data.name,
            image: data.sprites['front_default'],
            type: data.types.map(type => type.type.name).join(', '),
			abilites: data.abilities.map(ability => ability.ability.name).join(', ')
		};

			const pokemonDiv = document.createElement('div');
			pokemonDiv.setAttribute('class', 'div-card')
			pokemonDiv.innerHTML = `
			  <h3>${pokemon.name}</h3>
			  <img src="${pokemon.image}" alt="${pokemon.name}">
			  <p>Type: ${pokemon.type}</p>
			  <p>Ability: ${pokemon.abilites}</p>
			`;
			cardContainer.appendChild(pokemonDiv);
          
          pokemonList.push(pokemon);
 
          // Save the list to local storage
          localStorage.setItem('pokemonList', JSON.stringify(pokemonList));
        })
        .catch(error => console.error(error));
    }
  };
fetchPokemon()

  searchPokemonInput.addEventListener('keypress', async (event) => {
	if (event.key === 'Enter') {
	  const searchString = searchPokemonInput.value;
	  pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
  
	  const matchingPokemon = pokemonList.filter(pokemon => pokemon.name.includes(searchString));
  
	  // Clear the existing content of the container
	  cardContainer.innerHTML = '';
  
	  // Create a new div for each matching pokemon and append it to the container
	  matchingPokemon.forEach(pokemon => {
		const pokemonDiv = document.createElement('div');
		pokemonDiv.setAttribute('class', 'div-card')
		pokemonDiv.innerHTML = `
		  <h2>${pokemon.name}</h2>
		  <img src="${pokemon.image}" alt="${pokemon.name}">
		  <p>Type: ${pokemon.type}</p>
		`;
		cardContainer.appendChild(pokemonDiv);
	  });
	}
  });
 