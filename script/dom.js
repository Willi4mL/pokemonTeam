import { pokemonUrl } from "./fetch.js"

const findChampionButton = document.querySelector('#findChampion')
const myTeamButton = document.querySelector('#myTeam')
const searchPokemonNav = document.querySelector('#contentSearch')
const searchPokemonInput = document.querySelector('#searchChampion')

// Visible or invisible 
const invisible = 'none'
const visible = 'block'


// Toggle input
findChampionButton.addEventListener('click', () => {
	hideToShow(searchPokemonNav)
})


// Hide or Show function
function hideToShow(item) {
	if (item.style.display == visible) {
		return item.style.display = invisible
	}
	else {
		return item.style.display = visible
	}
}

// Searching fom pokemons
myTeamButton.addEventListener('click', async () => {
	const searchString = searchPokemonInput.value;
	const url = `https://pokeapi.co/api/v2/pokemon`;
  
	try {
	  let response = await fetch(url);
	  let data = await response.json();
	  console.log(data);
  
	  const matchingPokemon = data.results.filter(pokemon => pokemon.name.includes(searchString));
	  matchingPokemon.forEach(pokemon => {
		console.log(pokemon.name);
	  });
  
	} catch (error) {
	  console.log('Felmeddelande', error.message);
	}
  });

// if(event.key === 'Enter'){

// }
