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
            type: data.types.map(type => type.type.name).join(', ')
          };
          pokemonList.push(pokemon);
  
          // Save the list to local storage
          localStorage.setItem('pokemonList', JSON.stringify(pokemonList));
        })
        .catch(error => console.error(error));
    }
  };
  console.log(pokemonList)
  // Call the function to fetch and save the data
  fetchPokemon();
