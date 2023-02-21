import { pokemonUrl } from "./fetch.js"

const findChampionButton = document.querySelector('#findChampion')
const myTeamButton = document.querySelector('#myTeam')
const searchPokemonNav = document.querySelector('#contentSearch')
const searchPokemonInput = document.querySelector('#searchChampion')
const cardContainer = document.querySelector('#pokemonCardList')
const buttonCard = document.querySelector('#buttonCard')


// Visible or invisible 
const invisible = 'none'
const visible = 'block'

// FindChampion button
findChampionButton.addEventListener('click', async () => {
	searchPokemonNav.style.display = visible
	const findUrl = pokemonUrl

	let response = await fetch(findUrl)
	let data = await response.json()

	fetchPokemon()
})

// LocalStorage list and display divs
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
				const pokemonDiv = document.createElement('button');
				pokemonDiv.setAttribute('class', 'button-card')
				pokemonDiv.setAttribute('id', 'buttonCard')
				pokemonDiv.innerHTML = `
			  <h2>${pokemon.name}</h2>
			  <img src="${pokemon.image}" alt="${pokemon.name}">
			  <p>Type: ${pokemon.type}</p>
			  <p>Ability: ${pokemon.abilites}</p>
			`;
				cardContainer.append(pokemonDiv);

				pokemonList.push(pokemon);

				// Save the list to local storage
				localStorage.setItem('pokemonList', JSON.stringify(pokemonList));
			})
			.catch(error => console.error(error));
	}
};
fetchPokemon()

// Search pokemon and display card
searchPokemonInput.addEventListener('keypress', async (event) => {
	if (event.key === 'Enter') {
		const searchString = searchPokemonInput.value;
		pokemonList = JSON.parse(localStorage.getItem('pokemonList'));

		const matchingPokemon = pokemonList.filter(pokemon => pokemon.name.includes(searchString));

		// Clear the existing content of the container
		cardContainer.innerHTML = '';

		// Create a new div for each matching pokemon and append it to the container
		matchingPokemon.forEach(pokemon => {
			const pokemonDiv = document.createElement('button');
			pokemonDiv.setAttribute('class', 'button-card')
			pokemonDiv.setAttribute('id', 'buttonCard')
			pokemonDiv.innerHTML = `
		  <h2>${pokemon.name}</h2>
		  <img src="${pokemon.image}" alt="${pokemon.name}">
		  <p>Type: ${pokemon.type}</p>
		`;
			cardContainer.appendChild(pokemonDiv);
		});
	}
});

//   Add pokemons to my team in localstorage
let myTeamList = JSON.parse(localStorage.getItem('myTeamList')) || {};

document.addEventListener('click', (event) => {
  if (event.target.id === 'buttonCard') {
    const pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
    const pokemon = pokemonList.find(pokemon => pokemon.name === event.target.querySelector('h2').textContent);
  
    // Clear the existing data in myTeamList
    myTeamList = {};
    
    // Add the pokemon object to myTeamList object using the pokemon name as the key

		myTeamList[pokemon.name] = pokemon;
		
		// Save the updated myTeamList to localStorage
		localStorage.setItem('myTeamList', JSON.stringify(myTeamList));
  }
});


// MyTeam button
myTeamButton.addEventListener('click', () => {
	searchPokemonNav.style.display = invisible

	// Clear content of the container
	cardContainer.innerHTML = '';

})

