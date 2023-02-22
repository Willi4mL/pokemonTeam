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
				const pokemonDiv = document.createElement('div');
				pokemonDiv.setAttribute('class', 'div-card')
				pokemonDiv.setAttribute('id', 'divCard')
				pokemonDiv.innerHTML =
					`<h2 id="cardHeading">${pokemon.name}</h2>
				<img id="cardImg" src="${pokemon.image}" alt="${pokemon.name}">
				<p id="cardType">Type: ${pokemon.type}</p>
				<p id="cardAbility">Ability: ${pokemon.abilites}</p> `;

				const pokemonCardButton = document.createElement('button')
				pokemonCardButton.setAttribute('class', 'card-button')
				pokemonCardButton.setAttribute('id', 'cardButton')
				pokemonCardButton.innerText = 'Add to my team'

				pokemonDiv.append(pokemonCardButton)
				cardContainer.append(pokemonDiv);

				pokemonList.push(pokemon);

				// Save the list to local storage
				localStorage.setItem('pokemonList', JSON.stringify(pokemonList));

				addPokemonMyTeam()
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
			const pokemonDiv = document.createElement('div');
			pokemonDiv.setAttribute('class', 'div-card')
			pokemonDiv.setAttribute('id', 'divCard')
			pokemonDiv.innerHTML =
				`<h2 id="cardHeading">${pokemon.name}</h2>
				<img id="cardImg" src="${pokemon.image}" alt="${pokemon.name}">
				<p id="cardType">Type: ${pokemon.type}</p>
				<p id="cardAbility">Ability: ${pokemon.abilites}</p> `;

			const pokemonCardButton = document.createElement('button')
			pokemonCardButton.setAttribute('class', 'card-button')
			pokemonCardButton.setAttribute('id', 'cardButton')
			pokemonCardButton.innerText = 'Add to my team'

			pokemonDiv.append(pokemonCardButton)

			cardContainer.append(pokemonDiv);
		});
	}
});

// Add pokemons to my team in localstorage
function addPokemonMyTeam (){
	let myTeamList = JSON.parse(localStorage.getItem('myTeamList')) || [];
	
	document.addEventListener('click', (event) => {
		if (event.target.id === 'cardButton') {
			const pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
			const pokemon = pokemonList.find(pokemon => pokemon.name === event.target.parentNode.querySelector('#cardHeading').textContent);
	
			if (Object.keys(myTeamList).length < 3) {
	
	
				// Add the pokemon object to myTeamList object using the pokemon name as the key
				myTeamList[pokemon.name] = pokemon;
	
	
	
				// Save the updated myTeamList to localStorage
				localStorage.setItem('myTeamList', JSON.stringify(myTeamList));
			}
		}
	});
}

addPokemonMyTeam()

// MyTeam button
myTeamButton.addEventListener('click', () => {
	searchPokemonNav.style.display = "none";

	// Clear content of the container
	cardContainer.innerHTML = '';

	const myTeamList = JSON.parse(localStorage.getItem('myTeamList')) || {};

	Object.values(myTeamList).forEach(pokemon => {
		const pokemonDiv = document.createElement('div');
		pokemonDiv.setAttribute('class', 'div-card');
		pokemonDiv.setAttribute('id', 'divCard');
		pokemonDiv.innerHTML =
			`<h2 id="cardHeading">${pokemon.name}</h2>
      <img id="cardImg" src="${pokemon.image}" alt="${pokemon.name}">
      <p id="cardType">Type: ${pokemon.type}</p>
      <p id="cardAbility">Ability: ${pokemon.abilites}</p>`;

		const pokemonCardButtonRemove = document.createElement('button')
		pokemonCardButtonRemove.setAttribute('class', 'card-button')
		pokemonCardButtonRemove.setAttribute('id', 'cardButtonRemove')
		pokemonCardButtonRemove.innerText = 'Remove from my team'

		pokemonDiv.append(pokemonCardButtonRemove)

		cardContainer.append(pokemonDiv);

	});

	// Event listener to remove pokemonDiv and the corresponding Pokemon from the local storage when the "Remove from my team" button is clicked
	document.addEventListener('click', (event) => {
		if (event.target.id === 'cardButtonRemove') {
			// Get a reference to the parent element (the pokemonDiv)
			const pokemonDiv = event.target.parentNode;

			// Get the Pokemon name from the pokemonDiv
			const pokemonName = pokemonDiv.querySelector('#cardHeading').textContent;

			// Get the current myTeamList from the localStorage
			const myTeamList = JSON.parse(localStorage.getItem('myTeamList')) || {};

			// Delete the corresponding property for the deleted Pokemon
			delete myTeamList[pokemonName];

			// Save the updated myTeamList to the localStorage
			localStorage.setItem('myTeamList', JSON.stringify(myTeamList));

			// Remove the pokemonDiv element from the DOM
			pokemonDiv.remove();
		}
	});
});
