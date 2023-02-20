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

	// Creates div inside li for every pokemon
	const allPokemons = data.results.filter(allPokemon => allPokemon.name)
	allPokemons.forEach(allPokemon => {
		console.log(allPokemon.name)

		let pokemonStat = pokemonStatFunction()
		let pokemonCard = document.createElement('div')
		pokemonCard.setAttribute('class', 'pokemon-card')

		pokemonStat.name.innerText = JSON.stringify(allPokemon.name)
		pokemonCard.append(pokemonStat.name)
		cardContainer.append(pokemonCard)

	})
})

// MyTeam button
myTeamButton.addEventListener('click', () => {
	searchPokemonNav.style.display = invisible
})

// Searching fom pokemons
searchPokemonInput.addEventListener('keypress', async (event) => {
	if (event.key === 'Enter') {
		const searchString = searchPokemonInput.value;
		const url = pokemonUrl

		try {
			let response = await fetch(url)
			let data = await response.json()
			console.log(data)

			const matchingPokemon = data.results.filter(pokemon => pokemon.name.includes(searchString))
			matchingPokemon.forEach(pokemon => {
				console.log(pokemon.name)
			});

		} catch (error) {
			console.log('Felmeddelande', error.message)
		}
	}
});
