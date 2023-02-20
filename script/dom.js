import { pokemonUrl } from "./fetch.js"

const findChampionButton = document.querySelector('#findChampion')
const myTeamButton = document.querySelector('#myTeam')
const searchPokemonNav = document.querySelector('#contentSearch')
const searchPokemonInput = document.querySelector('#searchChampion')

// Visible or invisible 
const invisible = 'none'
const visible = 'block'


// FindChampion button
findChampionButton.addEventListener('click', () => {
	searchPokemonNav.style.display = visible
})

// MyTeam button
myTeamButton.addEventListener('click', () => {
	searchPokemonNav.style.display = invisible
})

// Searching fom pokemons
searchPokemonInput.addEventListener('keypress', async (event) => {
	if (event.key === 'Enter') {
		const searchString = searchPokemonInput.value;
		const url = pokemonUrl;

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
	}
});
